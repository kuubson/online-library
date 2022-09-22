import type { NextFunction, Request, Response } from 'express'
import type * as qs from 'qs'
import type { InferType } from 'yup'

import type { Role } from '@online-library/core'

import type { User } from 'database/models/User'

import type { TypedSchema } from 'yup/lib/util/types'

import type { AnyFile, AnyUser } from './any'

declare module 'express-serve-static-core' {
   interface Request {
      user: User | undefined | AnyUser
      file: Express.Multer.File | undefined | AnyFile
      allowedExtenstionsError?: boolean
      sizeLimit?: boolean
   }
}

export type InitialBody = object

export type InitialCookies = object

export type InitialQuery = Record<string, string>

type RouteTypeBase<RT extends 'default' | 'protected' = 'default'> = RT

type BodyBase<B extends object = InitialBody> = B

type CookiesBase<C extends object = InitialCookies> = C

type QueryBase<Q extends qs.ParsedQs = InitialQuery> = Q

type ValidationBase<V extends boolean = true> = V
interface ExpressRequest<
   B = BodyBase,
   C = CookiesBase,
   Q extends qs.ParsedQs = QueryBase,
   RT = RouteTypeBase
> extends Request {
   user: RT extends 'protected' ? User : undefined
   file: RT extends 'protected' ? Express.Multer.File : undefined
   body: B
   cookies: C
   query: Q
}

export type Middleware<
   B = BodyBase,
   C = CookiesBase,
   Q extends qs.ParsedQs = QueryBase,
   RT = RouteTypeBase
> = (req: ExpressRequest<B, C, Q, RT>, res: Response, next: NextFunction) => void

export type Route<
   B = BodyBase,
   C = CookiesBase,
   Q extends qs.ParsedQs = QueryBase,
   RT = RouteTypeBase,
   V = ValidationBase
> = V extends true ? [Middleware, Middleware<B, C, Q, RT>] : [Middleware<B, C, Q, RT>]

export type ProtectedRoute<
   B = BodyBase,
   C = CookiesBase,
   Q extends qs.ParsedQs = QueryBase,
   V = ValidationBase
> = Route<B, C, Q, 'protected', V>

export type Body<B extends TypedSchema> = InferType<B>['body']

export type Cookies<C extends TypedSchema> = InferType<C>['cookies']

export type Query<Q extends TypedSchema> = InferType<Q>['query']
export interface CustomRequest extends Request {
   user: {
      user: User
      role: Role
   }
}
