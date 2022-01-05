import middlewares from 'middlewares'

import { GraphQLResolverContext } from 'types/graphql'

export const borrowedBooks = async (_: any, __: any, context: GraphQLResolverContext) => {
    middlewares.roleAuthorization(context, 'user')
    return await context.user.getBooks({
        where: {
            price: null
        }
    })
}
