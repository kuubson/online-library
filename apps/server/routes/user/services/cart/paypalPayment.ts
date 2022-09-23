import paypal from 'paypal-rest-sdk'

import { API, ApiError, yup } from '@online-library/tools'

import { Book } from 'database'

import { yupValidation } from 'middlewares'

import type { Body, ProtectedRoute } from 'types/express'

const { validation, header, errors } = API['/api/user/cart/paypal/payment'].post

const schema = yup.object({ body: validation })

export const paypalPayment: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { paymentId, PayerID } = req.body

         const [payment] = await req.user.getPayments({ where: { paymentId } })

         if (!payment) {
            throw new ApiError(header, errors[404], 404)
         }

         if (payment.approved) {
            throw new ApiError(header, errors[409], 409)
         }

         paypal.payment.execute(paymentId, { payer_id: PayerID }, async (error, { state }) => {
            if (error || state !== 'approved') {
               throw new ApiError(header, errors[402], 402)
            }

            const books = await Book.findAll({ where: { id: payment.products.split(',') } })

            await Promise.all(books.map(async book => req.user.addBook(book)))

            await payment.update({ approved: true })

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
