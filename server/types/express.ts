import type { NextFunction, Response, Request as _Request } from 'express'

import type { User } from 'database/models/User'

export type Route = (req: Request, res: Response, next: NextFunction) => void

export type ProtectedRoute = (req: Request<true>, res: Response, next: NextFunction) => void

export interface Request<T = ''> extends _Request {
   user: T extends boolean ? User : undefined
   file: T extends boolean ? Express.Multer.File : undefined
}

declare module 'express-serve-static-core' {
   interface Request {
      user: User | undefined | any
      file: Express.Multer.File | undefined | any
      allowedExtenstionsError?: boolean
      sizeLimit?: boolean
   }
}
