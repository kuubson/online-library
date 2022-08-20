import csurf from 'csurf'
import { Application, NextFunction, Request, Response } from 'express'

import { cookie } from 'utils'

import { unless } from './'

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
