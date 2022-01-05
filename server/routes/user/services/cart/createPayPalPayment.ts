import paypal from 'paypal-rest-sdk'

import { Book } from 'database'

import { validator } from 'helpers'

import { ApiError, baseUrl } from 'utils'

import { ProtectedRoute } from 'types/express'

export const createPayPalPayment: ProtectedRoute = async (req, res, next) => {
    try {
        const { products } = req.body
        const userBooks = await req.user
            .getBooks({
                where: {
                    id: products
                }
            })
            .then(books => books.map(({ id }) => id))
        const books = await Book.findAll({
            where: {
                id: products
            }
        }).then(books => books.filter(({ id }) => !userBooks.includes(id)))
        if (books.length === 0) {
            throw new ApiError(
                'Submitting the order',
                'You have already purchased selected books before',
                409
            )
        }
        const description = books.map(({ title }) => title).join(', ')
        const price = books
            .map(({ price }) => price)
            .reduce((total, price) => total + price, 0)
            .toFixed(2)
        const payment = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: `${baseUrl(req)}/cart`,
                cancel_url: `${baseUrl(req)}/cart`
            },
            transactions: [
                {
                    item_list: {
                        items: books.map(book => {
                            return {
                                sku: book.id,
                                name: `Book "${book.title}"`,
                                price: book.price.toString(),
                                currency: 'USD',
                                quantity: 1
                            }
                        })
                    },
                    description,
                    amount: {
                        currency: 'USD',
                        total: price
                    }
                }
            ]
        }
        paypal.payment.create(payment as any, async (error: any, payment: any) => {
            try {
                if (error) {
                    throw new ApiError(
                        'Submitting the order',
                        'There was an unexpected problem when processing your payment',
                        402
                    )
                }
                const approvalLink = payment.links.find(({ rel }: any) => rel === 'approval_url')
                if (!approvalLink) {
                    throw new ApiError(
                        'Submitting the order',
                        'There was an unexpected problem when processing your payment',
                        402
                    )
                }
                await req.user.createPayment({
                    paymentId: payment.id,
                    products: products.join()
                })
                res.send({
                    link: approvalLink.href
                })
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [validator.validateArray('products', false)]
