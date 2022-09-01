import { Op } from 'sequelize'

import type { QueryResolvers } from 'types/graphql'

export const boughtBooks: QueryResolvers['boughtBooks'] = async (_, __, { req }) =>
   req.user.user.getBooks({ where: { price: { [Op.ne]: null } } })
