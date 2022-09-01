import { Op } from 'sequelize'

import { Book } from 'database'

import type { QueryResolvers } from 'types/graphql'

export const paidBooks: QueryResolvers['paidBooks'] = async (
   _,
   { paidBooksOffset, freeBooksOffset }
) =>
   Book.findAll({
      where: { price: { [Op.ne]: null } },
      limit: freeBooksOffset > 0 ? 0 : 10,
      offset: paidBooksOffset,
   })
