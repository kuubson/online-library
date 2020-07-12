import { makeExecutableSchema } from 'apollo-server'
import { merge } from 'lodash'

import Query from './Query'
import Book from './Book'

import UserResolvers from '../resolvers/user'

export default makeExecutableSchema({
    typeDefs: [Query, Book],
    resolvers: merge(UserResolvers)
})
