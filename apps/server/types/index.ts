import type { Response } from 'express'

import type { Role } from '@online-library/tools'

import type { CustomRequest } from 'types/express'

export type GraphqlContext = {
   req: CustomRequest
   res: Response
}

export type AuthTokenData = {
   role: Role
   email: string
}

export type PasswordTokenData = Pick<AuthTokenData, 'email'>
