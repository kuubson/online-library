import { check } from 'express-validator'
import { Op } from 'sequelize'

import { Book } from 'database'
import type { Book as BookType } from 'database/models/Book'

import { validator } from 'helpers'

import type { ProtectedRoute } from 'types/express'

export const getSuggestions: ProtectedRoute = async (req, res, next) => {
   try {
      const { title, author, withProfile } = req.body

      const property = title ? 'title' : 'author'

      const value = title ? title : author

      let books: BookType[] = []

      if (value) {
         if (!withProfile) {
            books = await Book.findAll({ where: { [property]: { [Op.like]: `%${value}%` } } })
         } else {
            books = await req.user.getBooks({ where: { [property]: { [Op.like]: `%${value}%` } } })
         }
      }

      res.send({ books })
   } catch (error) {
      next(error)
   }
}

export const validation = () => [
   check('title').trim().isString().bail().escape(),
   check('author').trim().isString().bail().escape(),
   validator.validateBoolean('withProfile'),
]
