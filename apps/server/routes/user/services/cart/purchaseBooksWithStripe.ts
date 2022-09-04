import Stripe from 'stripe'

import { API, ApiError, yup } from 'online-library'

import { STRIPE_SECRET_KEY } from 'config'

import { Book, Connection } from 'database'

import { yupValidation } from 'middlewares'

import { totalBooksPrice } from 'helpers'

import type { Body, ProtectedRoute } from 'types/express'

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' })

const { header, post, validation } = API.purchaseBooksWithStripe

const schema = yup.object({ body: validation })

export const purchaseBooksWithStripe: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { paymentId, products } = req.body

            const userBooks = await req.user
               .getBooks({ where: { id: products } })
               .then(books => books.map(({ id }) => id))

            const books = await Book.findAll({ where: { id: products } }).then(books =>
               books.filter(({ id }) => !userBooks.includes(id))
            )

            if (!books.length) {
               throw new ApiError(header, post[409], 409)
            }

            const description = books.map(({ title }) => title).join(', ')

            const price = totalBooksPrice(books)

            const customer = await stripe.customers.create({
               name: req.user.name,
               email: req.user.email,
            })

            const payment = await stripe.paymentIntents.create({
               customer: customer.id,
               description: `Books ${description}`,
               amount: parseFloat(price) * 100,
               currency: 'USD',
               payment_method: paymentId,
               confirm: true,
            })

            if (payment.status !== 'succeeded') {
               throw new ApiError(header, post[402], 402)
            }

            await Promise.all(books.map(async book => req.user.addBook(book, { transaction })))

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
