import { Book } from 'database'

import { roleAuthorization } from 'middlewares'

import { ApiError } from 'utils'

import { MutationResolvers } from 'types/graphql'

export const borrowBook: MutationResolvers['borrowBook'] = async (_, { bookId }, context) => {
   roleAuthorization(context)

   const book = await Book.findByPk(bookId)

   if (!book) {
      throw new ApiError('Borrowing a book', 'Something went wrong', 404)
   }

   if (await context.req.user.user.hasBook(book)) {
      throw new ApiError('Borrowing a book', 'You have already borrowed this book', 409)
   }

   await context.req.user.user.addBook(book)

   return book
}
