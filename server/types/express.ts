import type { NextFunction, Response, Request as _Request } from 'express'
import type { InferType } from 'yup'
import type { TypedSchema } from 'yup/lib/util/types'

import type { User } from 'database/models/User'

export type RouteType<B = object, T = ''> = (
   req: Request<B, T>,
   res: Response,
   next: NextFunction
) => void

type YupValidator = RouteType

export type Route<B = object, T = '', Validation = true> = Validation extends true
   ? [YupValidator, RouteType<B, T>]
   : [RouteType<B, T>]

export type ProtectedRoute<B = object, Validation = true> = Route<B, 'protected', Validation>

export interface Request<B = object, T = ''> extends _Request {
   user: T extends 'protected' ? User : undefined
   file: T extends 'protected' ? Express.Multer.File : undefined
   body: B
}

export type Body<T extends TypedSchema> = InferType<T>['body']

declare module 'express-serve-static-core' {
   interface Request {
      user: User | undefined | any
      file: Express.Multer.File | undefined | any
      allowedExtenstionsError?: boolean
      sizeLimit?: boolean
   }
}
