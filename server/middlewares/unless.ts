import { Middleware } from 'express-validator/src/base'

export const unless = (path: string, middleware: any) => {
   const middlewareFunction: Middleware = (req, res, next) => {
      if (path === req.path) {
         return next()
      }
      return middleware(req, res, next)
   }
   return middlewareFunction
}
