import Stripe from 'stripe'

import { API, ApiError, yup } from '@online-library/config'

import { STRIPE_SECRET_KEY } from 'config'

import { Connection } from 'database'

import { yupValidation } from 'middlewares'

import { totalBooksPrice, verifyPurchasingBooks } from 'helpers'

import type { Body, ProtectedRoute } from 'types/express'

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-08-01' })

const { validation, header, errors } = API['/api/user/cart/stripe/payment'].post

const schema = yup.object({ body: validation })

export const stripePayment: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { paymentId, products } = req.body

            const { books } = await verifyPurchasingBooks({
               user: req.user,
               products,
               header,
               errors,
            })

            const description = books.map(({ title }) => title).join(', ')

            const price = totalBooksPrice(books)

            const customer = await stripe.customers.create({
               name: req.user.name,
               email: req.user.email,
            })

            try {
               const payment = await stripe.paymentIntents.create({
                  customer: customer.id,
                  description: `Books ${description}`,
                  amount: parseFloat(price) * 100,
                  currency: 'USD',
                  payment_method: paymentId,
                  confirm: true,
               })

               if (payment.status !== 'succeeded') {
                  throw new ApiError(header, errors[402], 402)
               }

               await Promise.all(books.map(async book => req.user.addBook(book, { transaction })))

               res.send()
            } catch (error) {
               throw new ApiError(header, errors[402], 402)
            }
         })
      } catch (error) {
         next(error)
      }
   },
]
