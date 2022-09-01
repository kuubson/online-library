import { Book } from 'database'

import type { QueryResolvers } from 'types/graphql'

export const books: QueryResolvers['books'] = async (_, { ids }) =>
   Book.findAll({ where: { id: ids } })
