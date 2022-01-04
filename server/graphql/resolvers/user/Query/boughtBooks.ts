import { Op } from 'sequelize'

import middlewares from 'middlewares'

import { GraphQLResolverContext } from 'types/global'

const boughtBooks = async (_: any, __: any, context: GraphQLResolverContext) => {
    middlewares.roleAuthorization(context, 'user')
    return await context.user.getBooks({
        where: {
            price: {
                [Op.ne]: null
            }
        }
    })
}

export default boughtBooks
