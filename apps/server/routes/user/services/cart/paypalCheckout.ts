import type { Payment } from 'paypal-rest-sdk'
import paypal from 'paypal-rest-sdk'

import { API, ApiError, CLIENT_URL, yup } from '@online-library/config'

import { yupValidation } from 'middlewares'

import { totalBooksPrice, verifyPurchasingBooks } from 'helpers'

import type { Body, ProtectedRoute } from 'types/express'

const { validation, header, errors } = API['/api/user/cart/paypal/checkout'].post

const schema = yup.object({ body: validation })

export const paypalCheckout: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { products } = req.body

         const { books } = await verifyPurchasingBooks({
            user: req.user,
            products,
            header,
            errors,
         })

         const description = books.map(({ title }) => title).join(', ')

         const price = totalBooksPrice(books)

         const payment: Payment = {
            intent: 'sale',
            payer: { payment_method: 'paypal' },
            redirect_urls: {
               return_url: `${CLIENT_URL}/cart`,
               cancel_url: `${CLIENT_URL}/cart`,
            },
            transactions: [
               {
                  item_list: {
                     items: books.map(book => ({
                        sku: book.id as unknown as string,
                        name: `Book "${book.title}"`,
                        price: book.price?.toString() || '0',
                        currency: 'USD',
                        quantity: 1,
                     })),
                  },
                  description,
                  amount: {
                     currency: 'USD',
                     total: price,
                  },
               },
            ],
         }

         paypal.payment.create(payment, async (error, payment) => {
            try {
               if (error || !payment.id || !payment.links) {
                  throw new ApiError(header, errors[402], 402)
               }

               const approvalLink = payment.links.find(({ rel }) => rel === 'approval_url')

               if (!approvalLink) {
                  throw new ApiError(header, errors[402], 402)
               }

               await req.user.createPayment({
                  paymentId: payment.id,
                  products: products.join(),
               })

               res.send({ link: approvalLink.href })
            } catch (error) {
               next(error)
            }
         })
      } catch (error) {
         next(error)
      }
   },
]
