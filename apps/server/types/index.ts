import type { Response } from 'express'
import type { PubSub } from 'graphql-subscriptions'

import type { Role } from '@online-library/core'

import type { AnySwaggerData } from 'types'
import type { CustomRequest } from 'types/express'

export * from './any'

export type GraphqlContext = {
   req: CustomRequest
   res: Response
   pubsub: PubSub
}

export type AuthTokenData = {
   role: Role
   email: string
}

export type PasswordTokenData = Pick<AuthTokenData, 'email'>

export type SwaggerAutogenPromise = {
   success: string
   data: AnySwaggerData
}
