import { shield as _shield, and } from 'graphql-shield'
import type { LogicRule } from 'graphql-shield/dist/rules'

import { AuthError } from 'online-library'

import { isUser, rateLimiter } from 'gql/middlewares'

import { load } from './api'

type Rule = Record<string, LogicRule>

const userMutations: Rule = {}
const userQueries: Rule = {}
const userSubscriptions: Rule = {}

load(`api/user/mutations/**`).map(resolver => {
   const [mutation] = Object.keys(resolver)
   return (userMutations[mutation] = and(rateLimiter, isUser))
})

load(`api/user/queries`).map(resolver => {
   const [query] = Object.keys(resolver)
   return (userQueries[query] = and(isUser))
})

load(`api/user/subscriptions`).map(resolver => {
   const [subscription] = Object.keys(resolver)
   return (userSubscriptions[subscription] = and(isUser))
})

export const shield = _shield(
   {
      Query: { ...userQueries },
      Mutation: { ...userMutations },
      Subscription: { ...userSubscriptions },
   },
   {
      allowExternalErrors: true,
      fallbackError: AuthError,
   }
)
