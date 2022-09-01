import type { Middleware } from 'types/express'

export const unless = (path: string, middleware: Middleware) => {
   const route: Middleware = (req, res, next) => {
      if (path === req.path) {
         return next()
      }
      return middleware(req, res, next)
   }
   return route
}
