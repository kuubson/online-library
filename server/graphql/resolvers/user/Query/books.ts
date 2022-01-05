import { Book } from 'database'

import middlewares from 'middlewares'

import { GraphQLResolverContext } from 'types/global'

const books = async (_: any, { ids }: any, context: GraphQLResolverContext) => {
    middlewares.roleAuthorization(context, 'user')
    return await Book.findAll({
        where: {
            id: ids
        }
    })
}

export default books
