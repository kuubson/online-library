import { Book } from 'database'

import { string } from 'shared'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import type { ProtectedRoute } from 'types/express'

export const getCart: ProtectedRoute = [
   yupValidation({ body: { cart: yup.array().required().of(string) } }),
   async (req, res, next) => {
      try {
         const { cart } = req.body

         const books = await Book.findAll({ where: { id: cart } })

         res.send({ books })
      } catch (error) {
         next(error)
      }
   },
]
