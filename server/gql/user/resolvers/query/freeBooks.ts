import { Book } from 'database'

import { roleAuthorization } from 'middlewares'

import { GraphQLContext } from 'types/graphql'

type Args = {
   paidBooksOffset: number
   freeBooksOffset: number
}

export const freeBooks = async (
   _: any,
   { freeBooksOffset, paidBooksOffset }: Args,
   context: GraphQLContext
) => {
   roleAuthorization(context)
   return await Book.findAll({
      where: {
         price: null,
      },
      limit: paidBooksOffset > 0 ? 0 : 10,
      offset: freeBooksOffset,
   })
}
