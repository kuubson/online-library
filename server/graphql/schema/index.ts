import { makeExecutableSchema } from '@graphql-tools/schema'
import { merge } from 'lodash'

import Query from './Query'
import Book from './Book'

import UserResolvers from '../resolvers/user'

const schema = makeExecutableSchema({
    typeDefs: [Query, Book],
    resolvers: merge(UserResolvers)
})

export default schema
