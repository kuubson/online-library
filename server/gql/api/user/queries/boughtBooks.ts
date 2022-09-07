import { Op } from 'sequelize'

import { roleAuthorization } from 'middlewares'

import type { QueryResolvers } from 'types/graphql'

export const boughtBooks: QueryResolvers['boughtBooks'] = async (_, __, context) => {
   roleAuthorization(context)
   return context.req.user.user.getBooks({ where: { price: { [Op.ne]: null } } })
}
