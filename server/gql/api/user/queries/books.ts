import { Book } from 'database'

import { roleAuthorization } from 'middlewares'

import type { QueryResolvers } from 'types/graphql'

export const books: QueryResolvers['books'] = async (_, { ids }, context) => {
   roleAuthorization(context, 'user')
   return Book.findAll({ where: { id: ids } })
}
