import type { Route } from 'types/express'

export const unless = (path: string, middleware: Route) => {
   const route: Route = (req, res, next) => {
      if (path === req.path) {
         return next()
      }
      return middleware(req, res, next)
   }
   return route
}
