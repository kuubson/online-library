import { makeExecutableSchema } from '@graphql-tools/schema'
import { gql } from 'apollo-server-express'

import { userResolvers } from 'gql/user/resolvers'
import { userTypeDefs } from 'gql/user/typeDefs'

const typeDefs = [...userTypeDefs]

const resolvers = [userResolvers]

export const schema = makeExecutableSchema({
   typeDefs: [
      gql`
         type Query
         type Mutation
      `,
      typeDefs,
   ],
   resolvers,
})
