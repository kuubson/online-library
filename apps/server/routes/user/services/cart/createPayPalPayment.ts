import type { Payment } from 'paypal-rest-sdk'
import paypal from 'paypal-rest-sdk'

import { API, products } from 'online-library'

import { Book } from 'database'

import { yupValidation } from 'middlewares'

import { totalBooksPrice, yup } from 'helpers'

import { ApiError, baseUrl } from 'utils'

import type { Body, ProtectedRoute } from 'types/express'

const ENDPOINT = API.CART.createPayPalPayment

const schema = yup.object({ body: yup.object({ products }) })

export const createPayPalPayment: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { products } = req.body

         const userBooks = await req.user
            .getBooks({ where: { id: products } })
            .then(books => books.map(({ id }) => id))

         const books = await Book.findAll({ where: { id: products } }).then(books =>
            books.filter(({ id }) => !userBooks.includes(id))
         )

         if (books.length === 0) {
            throw new ApiError(
               'Submitting the order',
               'You have already purchased selected books before',
               409
            )
         }

         const description = books.map(({ title }) => title).join(', ')

         const price = totalBooksPrice(books)

         const payment: Payment = {
            intent: 'sale',
            payer: { payment_method: 'paypal' },
            redirect_urls: {
               return_url: `${baseUrl(req)}/cart`,
               cancel_url: `${baseUrl(req)}/cart`,
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
               if (error || !payment.id) {
                  throw new ApiError(
                     'Submitting the order',
                     'There was an unexpected problem when processing your payment',
                     402
                  )
               }

               const approvalLink = payment.links?.find(({ rel }) => rel === 'approval_url')

               if (!approvalLink) {
                  throw new ApiError(
                     'Submitting the order',
                     'There was an unexpected problem when processing your payment',
                     402
                  )
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
