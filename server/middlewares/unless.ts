import type { RouteType } from 'types/express'

export const unless = (path: string, middleware: RouteType) => {
   const route: RouteType = (req, res, next) => {
      if (path === req.path) {
         return next()
      }
      return middleware(req, res, next)
   }
   return route
}
