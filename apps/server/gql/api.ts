import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import _path from 'path'

import { isProd, isTest } from '@online-library/config'

import { scanResolvers } from 'config'

export const load = (path: string, isSchema = false) => {
   const extension = isSchema ? 'gql' : isProd || isTest ? 'js' : 'ts'
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
