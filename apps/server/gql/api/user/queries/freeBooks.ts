import { Book } from 'database'

import type { QueryResolvers } from 'types/graphql'

export const freeBooks: QueryResolvers['freeBooks'] = async (
   _,
   { freeBooksOffset, paidBooksOffset }
) =>
   Book.findAll({
      where: { price: null },
      limit: paidBooksOffset > 0 ? 0 : 10,
      offset: freeBooksOffset,
   })
