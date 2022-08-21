import { Book } from 'database'

import { roleAuthorization } from 'middlewares'

import type { QueryResolvers } from 'types/graphql'

export const freeBooks: QueryResolvers['freeBooks'] = async (
   _,
   { freeBooksOffset, paidBooksOffset },
   context
) => {
   roleAuthorization(context)
   return Book.findAll({
      where: { price: null },
      limit: paidBooksOffset > 0 ? 0 : 10,
      offset: freeBooksOffset,
   })
}
