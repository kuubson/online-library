import { Op } from 'sequelize'

import { Book } from 'database'

import { roleAuthorization } from 'middlewares'

import { QueryResolvers } from 'types/graphql'

export const paidBooks: QueryResolvers['paidBooks'] = async (
   _,
   { paidBooksOffset, freeBooksOffset },
   context
) => {
   roleAuthorization(context)
   return Book.findAll({
      where: { price: { [Op.ne]: null } },
      limit: freeBooksOffset > 0 ? 0 : 10,
      offset: paidBooksOffset,
   })
}
