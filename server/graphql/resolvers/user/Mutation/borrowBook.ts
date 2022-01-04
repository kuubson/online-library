import { Book } from 'database/database'

import middlewares from 'middlewares'

import utils from 'utils'

import { GraphQLResolverContext } from 'types/global'

const borrowBook = async (_: any, { bookId }: any, context: GraphQLResolverContext) => {
    middlewares.roleAuthorization(context, 'user')
    const book = await Book.findByPk(bookId)
    if (await context.user.hasBook(book)) {
        throw new utils.ApiError('Borrowing a book', 'You have already borrowed this book', 409)
    }
    await context.user.addBook(book)
    return book
}

export default borrowBook
