import { Book } from '../../../../database/database'

import middlewares from '../../../../middlewares'

import utils from '../../../../utils'

import { IContext } from '../../types'

interface IArgs {
    bookId: string
}

export default async (_, { bookId }: IArgs, context: IContext) => {
    middlewares.roleAuthorization(context, 'user')
    const book = await Book.findByPk(bookId)
    if (await context.user.hasBook(book)) {
        throw new utils.ApiError('Borrowing a book', 'You have already borrowed this book', 409)
    }
    await context.user.addBook(book)
    return book
}
