import csurf from 'csurf'
import type { Application, NextFunction, Request, Response } from 'express'

import { unless } from 'middlewares'

import { cookie } from 'utils'

export const initializeCsrf = async (app: Application) => {
   app.use(unless('/graphql', csurf({ cookie: cookie() })))
   app.use(
      unless('/graphql', (req: Request, res: Response, next: NextFunction) => {
         res.cookie('XSRF-TOKEN', req.csrfToken(), {
            ...cookie(true),
            httpOnly: false,
         })
         next()
      })
   )
}
