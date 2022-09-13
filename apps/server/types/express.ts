import type { NextFunction, Request, Response } from 'express'
import type { InferType } from 'yup'

import type { Role } from '@online-library/tools'

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
interface ExpressRequest<B = BodyBase, C = CookiesBase, RT = RouteTypeBase> extends Request {
   user: RT extends 'protected' ? User : undefined
   file: RT extends 'protected' ? Express.Multer.File : undefined
   body: B
   cookies: C
}

export type Middleware<B = BodyBase, C = CookiesBase, RT = RouteTypeBase> = (
   req: ExpressRequest<B, C, RT>,
   res: Response,
   next: NextFunction
) => void

export type Route<
   B = BodyBase,
   C = CookiesBase,
   RT = RouteTypeBase,
   V = ValidationBase
> = V extends true
   ? [Middleware, Middleware<B, C, RT>] // requires validation middleware to be applied when creating a route
   : [Middleware<B, C, RT>]

export type ProtectedRoute<B = BodyBase, C = CookiesBase, V = ValidationBase> = Route<
   B,
   C,
   'protected',
   V
>

export type Body<RouteType extends TypedSchema> = InferType<RouteType>['body']

export type Cookies<RouteType extends TypedSchema> = InferType<RouteType>['cookies']

export interface CustomRequest extends Request {
   user: {
      user: User
      role: Role
   }
}
