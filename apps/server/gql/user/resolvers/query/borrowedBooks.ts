import { roleAuthorization } from 'middlewares'

import { GraphQLContext } from 'types/graphql'

export const borrowedBooks = async (_: any, __: any, context: GraphQLContext) => {
    roleAuthorization(context)
    return await context.req.user.user.getBooks({
        where: {
            price: null
        }
    })
}
