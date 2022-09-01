import { rule } from 'graphql-shield'

import type { GraphqlContext } from 'types'

export const isUser = rule()(
   async (_: object, __: object, { req }: GraphqlContext) => req.user.role === 'user'
)
