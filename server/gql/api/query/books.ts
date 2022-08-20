import { Book } from 'database'

import { roleAuthorization } from 'middlewares'

import { GraphQLContext } from 'types/graphql'

type Args = {
   ids: number[]
}

export const books = async (_: any, { ids }: Args, context: GraphQLContext) => {
   roleAuthorization(context, 'user')
   return Book.findAll({
      where: {
         id: ids,
      },
   })
}
