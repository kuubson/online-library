import { Op } from 'sequelize'

import { roleAuthorization } from 'middlewares'

import { GraphQLContext } from 'types/graphql'

export const boughtBooks = async (_: any, __: any, context: GraphQLContext) => {
    roleAuthorization(context)
    return await context.req.user.user.getBooks({
        where: {
            price: {
                [Op.ne]: null
            }
        }
    })
}
