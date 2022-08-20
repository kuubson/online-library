import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import _path from 'path'

import { NODE_ENV } from 'config'

import { scanResolvers } from 'helpers'

export const load = (path: string, withSchema = false) => {
   const extension = withSchema ? 'gql' : NODE_ENV === 'production' ? 'js' : 'ts'
   return loadFilesSync(_path.join(__dirname, `./${path}/*.${extension}`))
}

export const typeDefs = mergeTypeDefs([
   load('scalars', true),
   load('enums', true),
   load('api/**/**/typeDefs', true),
])

export const resolvers = [
   mergeResolvers(load('scalars')),
   scanResolvers('Query', load),
   scanResolvers('Mutation', load),
   scanResolvers('Subscription', load),
]
