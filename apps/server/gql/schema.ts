import { makeExecutableSchema } from '@graphql-tools/schema'
import { gql } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'

import { resolvers, typeDefs } from './api'
import { shield } from './shield'

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
   }),
   shield
) as any
