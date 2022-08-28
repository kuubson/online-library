import type { NextFunction, Response, Request as _Request } from 'express'
import type { InferType } from 'yup'
import type { TypedSchema } from 'yup/lib/util/types'

import type { User } from 'database/models/User'

declare module 'express-serve-static-core' {
   interface Request {
      user: User | undefined | any
      file: Express.Multer.File | undefined | any
      allowedExtenstionsError?: boolean
      sizeLimit?: boolean
   }
}

export type InitialBody = object

export type InitialCookies = object

type Type = 'default' | 'protected'

export interface Request<
   Body extends object = InitialBody,
   Cookies = InitialCookies,
   RouteType extends Type = 'default'
> extends _Request {
   user: RouteType extends 'protected' ? User : undefined
   file: RouteType extends 'protected' ? Express.Multer.File : undefined
   body: Body
   cookies: Cookies
}

export type Middleware<
   Body extends object = InitialBody,
   Cookies extends object = InitialCookies,
   RouteType extends Type = 'default'
> = (req: Request<Body, Cookies, RouteType>, res: Response, next: NextFunction) => void

export type Route<
   Body extends object = InitialBody,
   Cookies extends object = InitialCookies,
   RouteType extends Type = 'default',
   Validation extends boolean = true
> = Validation extends true
   ? [Middleware, Middleware<Body, Cookies, RouteType>] // requires validation middleware
   : [Middleware<Body, Cookies, RouteType>]

export type ProtectedRoute<
   Body extends object = InitialBody,
   Cookies extends object = InitialCookies,
   Validation extends boolean = true
> = Route<Body, Cookies, 'protected', Validation>

export type Body<RouteType extends TypedSchema> = InferType<RouteType>['body']

export type Cookies<RouteType extends TypedSchema> = InferType<RouteType>['cookies']
