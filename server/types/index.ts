import { Request, Response } from 'express'

import { User } from 'database/models/User'

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

type ExpressErrorCode = 'EBADCSRFTOKEN'

export type ExpressError = {
   status: number
   message: string
   errorHeader: string
   errorMessage: string
   code?: ExpressErrorCode
}
