import { mergeResolvers } from '@graphql-tools/merge'

import type { AnyResolver } from 'types'

type LoadFn = (pathname: string, withSchema?: boolean) => AnyResolver[]

enum Resolvers {
   Query = 'queries',
   Mutation = 'mutations',
   Subscription = 'subscriptions',
}

const findDuplicatedResolvers = (resolvers: AnyResolver[]) => {
   const flatResolvers = resolvers.flat().map(Object.keys).flat()

   const duplicates = flatResolvers
      .map(resolver => {
         const isDuplicated = flatResolvers.filter(value => value === resolver).length > 1
         return isDuplicated && resolver
      })
      .filter(resolver => resolver)

   const uniqueDuplicates = [...new Set(duplicates)]

   if (uniqueDuplicates.length) {
      const resolvers = uniqueDuplicates.join(', ')
      throw new Error(`Found duplicated resolvers: ${resolvers}`)
   }
}

export const scanResolvers = (resolver: 'Query' | 'Mutation' | 'Subscription', load: LoadFn) => {
   const folders = ['common', 'guest', 'user']

   const resolvers = folders.map(folder => load(`api/${folder}/${Resolvers[resolver]}/**`))

   findDuplicatedResolvers(resolvers)

   return { [resolver]: { ...mergeResolvers(resolvers.flat()) } }
}
