import paypal from 'paypal-rest-sdk'

import { Connection, Book } from 'database'

import { validator } from 'helpers'

import { ApiError } from 'utils'

import { ProtectedRoute } from 'types/express'

export const executePayPalPayment: ProtectedRoute = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { paymentId, PayerID } = req.body
            const [payment] = await req.user.getPayments({
                where: {
                    paymentId
                },
                transaction
            })
            if (!payment) {
                throw new ApiError(
                    'Submitting the order',
                    'There was an unexpected problem when processing your payment',
                    402
                )
            }
            if (payment.approved) {
                throw new ApiError(
                    'Submitting the order',
                    'The order has been already approved',
                    409
                )
            }
            paypal.payment.execute(
                paymentId,
                {
                    payer_id: PayerID
                },
                async (error: any, executedPayment: any) => {
                    if (error || executedPayment.state !== 'approved') {
                        throw new ApiError(
                            'Submitting the order',
                            'There was an unexpected problem when processing your payment',
                            402
                        )
                    }
                    const books = await Book.findAll({
                        where: {
                            id: payment.products.split(',')
                        }
                    })
                    await Promise.all(books.map(async book => await req.user.addBook(book)))
                    await payment.update({
                        approved: true
                    })
                    res.send({
                        success: true
                    })
                }
            )
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    validator.validateProperty('paymentId'),
    validator.validateProperty('PayerID')
]
