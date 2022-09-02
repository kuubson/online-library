import { Op } from 'sequelize'

import { bool } from 'online-library'

import { Book } from 'database'
import type { Book as BookType } from 'database/models/Book'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import type { Body, ProtectedRoute } from 'types/express'

const schema = yup.object({
   body: yup.object({
      title: yup.string().trim(),
      author: yup.string().trim(),
      withProfile: bool,
   }),
})

export const getSuggestions: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { title, author, withProfile } = req.body

         let books: BookType[] = []

         const searchByKey = title ? 'title' : 'author'
         const searchByValue = title ?? author

         const query = { where: { [searchByKey]: { [Op.like]: `%${searchByValue}%` } } }

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
