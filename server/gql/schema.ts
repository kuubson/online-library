import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { Book } from 'gql/user/typeDefs/Book'
import { userResolvers } from 'gql/user/resolvers'

const userTypeDefs = [Book]

const resolvers = [userResolvers]

export const schema = makeExecutableSchema({
    typeDefs: [
        gql`
            type Query
            type Mutation
            type Subscription
        `,
        userTypeDefs
    ],
    resolvers
})
