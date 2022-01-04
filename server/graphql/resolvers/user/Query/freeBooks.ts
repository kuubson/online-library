import { Book } from 'database/database'

import middlewares from 'middlewares'

import { GraphQLResolverContext } from 'types/global'

const freeBooks = async (
    _: any,
    { freeBooksOffset, paidBooksOffset }: any,
    context: GraphQLResolverContext
) => {
    middlewares.roleAuthorization(context, 'user')
    return await Book.findAll({
        where: {
            price: null
        },
        limit: paidBooksOffset > 0 ? 0 : 10,
        offset: freeBooksOffset
    })
}

export default freeBooks
