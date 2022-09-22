import { ApiError } from '@online-library/core'

import { Book } from 'database'

import type { MutationResolvers } from 'types/graphql'

export const borrowBook: MutationResolvers['borrowBook'] = async (_, { bookId }, { req }) => {
   const book = await Book.findByPk(bookId)

   if (!book) {
      throw new ApiError('Borrowing a book', 'Something went wrong', 404)
   }

   if (await req.user.user.hasBook(book)) {
      throw new ApiError('Borrowing a book', 'Selected book has been already borrowed', 409)
   }

   await req.user.user.addBook(book)

   return book
}
