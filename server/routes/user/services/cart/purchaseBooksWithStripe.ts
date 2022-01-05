import Stripe from 'stripe'

import { Connection, Book } from 'database'

import { validator } from 'helpers'

import { ApiError } from 'utils'

import { ProtectedRoute } from 'types/express'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-03-02' as any
})

export const purchaseBooksWithStripe: ProtectedRoute = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { paymentId, products } = req.body
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
            const customer = await stripe.customers.create({
                name: req.user.name,
                email: req.user.email
            })
            const payment = await stripe.paymentIntents.create({
                customer: customer.id,
                description: `Books ${description}`,
                amount: parseFloat(price) * 100,
                currency: 'USD',
                payment_method: paymentId,
                confirm: true
            })
            if (payment.status !== 'succeeded') {
                throw new ApiError(
                    'Submitting the order',
                    'There was an unexpected problem when processing your payment',
                    402
                )
            }
            await Promise.all(
                books.map(
                    async book =>
                        await req.user.addBook(book, {
                            transaction
                        })
                )
            )
            res.send({
                success: true
            })
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    validator.validateProperty('paymentId'),
    validator.validateArray('products', false)
]
