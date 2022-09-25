import type { Response } from 'express'
import type { PubSub } from 'graphql-subscriptions'

import type { Role } from '@online-library/config'

import type { CustomRequest } from 'types/express'

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
   data: any
}
