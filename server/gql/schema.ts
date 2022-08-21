import { makeExecutableSchema } from '@graphql-tools/schema'
import { gql } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'

import { resolvers, typeDefs } from './api/api'

export const schema = applyMiddleware(
   makeExecutableSchema({
      typeDefs: [
         gql`
            type Query
            type Mutation
            type Subscription
         `,
         typeDefs,
      ],
      resolvers,
   })
)
