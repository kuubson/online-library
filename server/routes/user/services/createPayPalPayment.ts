import { Request, Response, NextFunction } from 'express'
import paypal from 'paypal-rest-sdk'

import { Connection, Book } from '../../../database/database'

import utils from '../../../utils'

interface IBody {
    paymentId: string
    products: string[]
}

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
})

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Connection.transaction(async transaction => {
                const { products }: IBody = req.body
                const books = await Book.findAll({
                    where: {
                        id: products
                    },
                    transaction
                })
                const price = books
                    .map(({ price }) => price!)
                    .reduce((total, price) => total + price, 0)
                    .toFixed(2)
                const description = books.map(({ title }) => title).join(', ')
                const payment = {
                    intent: 'sale',
                    payer: {
                        payment_method: 'paypal'
                    },
                    redirect_urls: {
                        return_url: `${utils.baseUrl(req)}/user/cart`,
                        cancel_url: `${utils.baseUrl(req)}/user/cart`
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
                            amount: {
                                currency: 'USD',
                                total: price
                            },
                            description
                        }
                    ]
                }
                paypal.payment.create(payment, async (error, payment) => {
                    try {
                        if (error) {
                            throw new utils.ApiError(
                                'Submitting the order',
                                'There was an unexpected problem when processing your payment',
                                402
                            )
                        }
                        const approvalLink = payment.links.find(({ rel }) => rel === 'approval_url')
                        if (!approvalLink) {
                            throw new utils.ApiError(
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
            })
        } catch (error) {
            next(error)
        }
    },
    validation: () => [utils.validator.validateProperty('products', null, null, true).isArray()]
}
