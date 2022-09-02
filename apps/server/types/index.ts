import type { Response, Request as _Request } from 'express'

import type { User } from 'database/models/User'

type Role = 'user'

interface Request extends _Request {
   user: {
      user: User
      role: Role
   }
}

export type GraphqlContext = {
   req: Request
   res: Response
}

export type AuthTokenData = {
   role: Role
   email: string
}

export type PasswordTokendata = {
   email: string
}

type OAuthError = {
   statusCode: number
   data: string
}

export type OAuthErrorData = {
   error: {
      message: string
      type: string
      code: number
      fbtrace_id: string
   }
}

export type ExpressError = {
   status: number
   type: string
   message: string
   errorHeader: string
   errorMessage: string
   code?: 'EBADCSRFTOKEN'
   oauthError: OAuthError
}

export type Resolver = any
