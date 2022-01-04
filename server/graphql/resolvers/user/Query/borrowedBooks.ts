import middlewares from 'middlewares'

import { GraphQLResolverContext } from 'types/global'

const borrowedBooks = async (_: any, __: any, context: GraphQLResolverContext) => {
    middlewares.roleAuthorization(context, 'user')
    return await context.user.getBooks({
        where: {
            price: null
        }
    })
}

export default borrowedBooks
