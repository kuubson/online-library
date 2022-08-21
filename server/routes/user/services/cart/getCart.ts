import { Book } from 'database'

import { validator } from 'helpers'

import type { ProtectedRoute } from 'types/express'

export const getCart: ProtectedRoute = async (req, res, next) => {
   try {
      const { cart } = req.body

      const books = await Book.findAll({ where: { id: cart } })

      res.send({ books })
   } catch (error) {
      next(error)
   }
}

export const validation = () => [validator.validateArray('cart', true)]
