import { Book } from '@database'

import middlewares from '@middlewares'

import utils from '@utils'

export default async (_, { bookId }, context) => {
    middlewares.roleAuthorization(context, 'user')
    const book = await Book.findByPk(bookId)
    if (await context.user.hasBook(book)) {
        throw new utils.ApiError('Borrowing a book', 'You have already borrowed this book', 409)
    }
    await context.user.addBook(book)
    return book
}
