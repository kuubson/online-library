import Stripe from 'stripe'

import { Connection, Book } from '@database'

import utils from '@utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-03-02'
})

export default {
    default: async (req, res, next) => {
        try {
            await Connection.transaction(async transaction => {
                const { paymentId, products } = req.body
                const books = await Book.findAll({
                    where: {
                        id: products
                    },
                    transaction
                })
                const price = books
                    .map(({ price }) => price)
                    .reduce((total, price) => total + price, 0)
                    .toFixed(2)
                const description = books.map(({ title }) => title).join(', ')
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
                    throw new utils.ApiError(
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
    },
    validation: () => [
        utils.validator.validateProperty('paymentId'),
        utils.validator.validateArray('products', false)
    ]
}
