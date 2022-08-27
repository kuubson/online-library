import type { NextFunction, Response, Request as _Request } from 'express'

import type { User } from 'database/models/User'

export type RouteType<T = ''> = (req: Request<T>, res: Response, next: NextFunction) => void

export type Route<T = '', Validation = true> = Validation extends true
   ? [RouteType<T>, RouteType]
   : [RouteType<T>]

export type ProtectedRoute<Validation = true> = Route<'protected', Validation>

export interface Request<T = ''> extends _Request {
   user: T extends 'protected' ? User : undefined
   file: T extends 'protected' ? Express.Multer.File : undefined
}

declare module 'express-serve-static-core' {
   interface Request {
      user: User | undefined | any
      file: Express.Multer.File | undefined | any
      allowedExtenstionsError?: boolean
      sizeLimit?: boolean
   }
}
