import { Op } from 'sequelize'

import { Book } from 'database'

import { roleAuthorization } from 'middlewares'

import { GraphQLContext } from 'types/graphql'

type Args = {
   paidBooksOffset: number
   freeBooksOffset: number
}

export const paidBooks = async (
   _: any,
   { paidBooksOffset, freeBooksOffset }: Args,
   context: GraphQLContext
) => {
   roleAuthorization(context)
   return await Book.findAll({
      where: {
         price: {
            [Op.ne]: null,
         },
      },
      limit: freeBooksOffset > 0 ? 0 : 10,
      offset: paidBooksOffset,
   })
}
