import { Op } from 'sequelize'

import { API, yup } from '@online-library/tools'

import { Book } from 'database'
import type { Book as BookType } from 'database/models/Book'

import { yupValidation } from 'middlewares'

import type { Body, ProtectedRoute } from 'types/express'

const { validation } = API['/api/user/books/suggestions'].post

const schema = yup.object({ body: validation })

export const getSuggestions: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { title, author, withProfile } = req.body

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
