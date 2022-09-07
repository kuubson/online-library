import type { Request, Response } from 'express'

import type { User } from 'database/models/User'

type Role = 'user'

type GraphQLRequest = Request & {
   user: {
      user: User
      role: Role
   }
}

export type GraphqlContext = {
   req: GraphQLRequest
   res: Response
}

export type AuthTokenData = {
   role: Role
   email: string
}

export type PasswordTokendata = {
   email: string
}

export type ExpressError = {
   status: number
   message: string
   errorHeader: string
   errorMessage: string
   code?: 'EBADCSRFTOKEN'
}

export type Resolver = any
