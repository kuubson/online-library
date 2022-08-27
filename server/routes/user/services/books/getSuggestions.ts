import { Op } from 'sequelize'

import { Book } from 'database'
import type { Book as BookType } from 'database/models/Book'

import { bool } from 'shared'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import type { ProtectedRoute } from 'types/express'

export const getSuggestions: ProtectedRoute = [
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
   yupValidation({
      body: {
         title: yup.string().trim(),
         author: yup.string().trim(),
         withProfile: bool,
      },
   }),
]
