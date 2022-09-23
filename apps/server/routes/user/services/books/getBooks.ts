import { Op } from 'sequelize'

import { API, yup } from '@online-library/config'

import { Book } from 'database'
import type { Book as BookType } from 'database/models/Book'

import { yupValidation } from 'middlewares'

import type { Body, ProtectedRoute } from 'types/express'

const { validation } = API['/api/user/books'].get

const schema = yup.object({ query: validation })

export const getBooks: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { title, author, withProfile } = req.query

         let books: BookType[] = []

         const searchByKey = title ? 'title' : 'author'
         const searchByValue = title ? title : author

         const query = { where: { [searchByKey]: { [Op.iLike]: `%${searchByValue}%` } } }

         if (searchByValue) {
            if (withProfile) {
               books = await req.user.getBooks(query)
            } else {
               books = await Book.findAll(query)
            }
         }

         res.send({ books })
      } catch (error) {
         next(error)
      }
   },
]
