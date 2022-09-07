import type { NextFunction, Response, Request as _Request } from 'express'
import type { InferType } from 'yup'

import type { User } from 'database/models/User'

import type { TypedSchema } from 'yup/lib/util/types'

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

type RouteTypeBase<RT extends 'default' | 'protected' = 'default'> = RT

type BodyBase<B extends object = InitialBody> = B

type CookiesBase<C extends object = InitialCookies> = C

type ValidationBase<V extends boolean = true> = V
export interface Request<B = BodyBase, C = CookiesBase, RT = RouteTypeBase> extends _Request {
   user: RT extends 'protected' ? User : undefined
   file: RT extends 'protected' ? Express.Multer.File : undefined
   body: B
   cookies: C
}

export type Middleware<B = BodyBase, C = CookiesBase, RT = RouteTypeBase> = (
   req: Request<B, C, RT>,
   res: Response,
   next: NextFunction
) => void

export type Route<
   B = BodyBase,
   C = CookiesBase,
   RT = RouteTypeBase,
   V = ValidationBase
> = V extends true
   ? [Middleware, Middleware<B, C, RT>] // requires validation middleware
   : [Middleware<B, C, RT>]

export type ProtectedRoute<B = BodyBase, C = CookiesBase, V = ValidationBase> = Route<
   B,
   C,
   'protected',
   V
>

export type Body<RouteType extends TypedSchema> = InferType<RouteType>['body']

export type Cookies<RouteType extends TypedSchema> = InferType<RouteType>['cookies']
