import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { userTypeDefs } from 'gql/user/typeDefs'
import { userResolvers } from 'gql/user/resolvers'

const typeDefs = [...userTypeDefs]

const resolvers = [userResolvers]

export const schema = makeExecutableSchema({
    typeDefs: [
        gql`
            type Query
            type Mutation
        `,
        typeDefs
    ],
    resolvers
})
