import { Book } from 'database'

import { roleAuthorization } from 'middlewares'

import { QueryResolvers } from 'types/graphql'

export const books: QueryResolvers['books'] = async (_, { ids }, context) => {
   roleAuthorization(context, 'user')
   return Book.findAll({ where: { id: ids } })
}
