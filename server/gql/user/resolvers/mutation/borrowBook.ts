import { Book } from 'database'

import { roleAuthorization } from 'middlewares'

import { ApiError } from 'utils'

import { GraphQLContext } from 'types/graphql'

type Args = {
   bookId: number
}

export const borrowBook = async (_: any, { bookId }: Args, context: GraphQLContext) => {
   roleAuthorization(context)
   const book = await Book.findByPk(bookId)
   if (await context.req.user.user.hasBook(book)) {
      throw new ApiError('Borrowing a book', 'You have already borrowed this book', 409)
   }
   await context.req.user.user.addBook(book)
   return book
}
