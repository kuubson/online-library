import passport from 'passport'

import { cookie } from 'utils'

import type { Middleware } from 'types/express'

export const jwtAuthorization: Middleware = (req, res, next) => {
   passport.authenticate('jwt', { session: false }, (error, { user, role }) => {
      const roleMatchesWithEndpoint = role === req.originalUrl.split('/')[2]

      if (error || !user || !roleMatchesWithEndpoint) {
         return res.clearCookie('token', cookie()).status(401).send({
            errorHeader: 'Authorization',
            errorMessage: 'The authentication cookie is invalid, log in again',
         })
      }

      req.user = user

      next()
   })(req, res, next)
}
