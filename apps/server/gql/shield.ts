import { shield as _shield, and } from 'graphql-shield'
import type { LogicRule } from 'graphql-shield/typings/rules'

import { AuthError } from '@online-library/config'

import { isUser, rateLimiter } from 'gql/middlewares'

import { load } from './api'

type Rule = Record<string, LogicRule>

const userMutations: Rule = {}
const userQueries: Rule = {}

load(`api/user/mutations/**`).map(resolver => {
   const [mutation] = Object.keys(resolver)
   return (userMutations[mutation] = and(rateLimiter, isUser))
})

load(`api/user/queries`).map(resolver => {
   const [query] = Object.keys(resolver)
   return (userQueries[query] = and(isUser))
})

export const shield = _shield(
   {
      Query: { ...userQueries },
      Mutation: { ...userMutations },
   },
   {
      allowExternalErrors: true,
      fallbackError: AuthError,
   }
)
