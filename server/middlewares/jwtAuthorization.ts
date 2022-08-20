import passport from 'passport'

import { cookie } from 'utils'

import { Route } from 'types/express'

export const jwtAuthorization: Route = (req, res, next) => {
   passport.authenticate('jwt', { session: false }, (error, { user, role }) => {
      const roleDoesNotMatchEndpointUrl = role !== req.originalUrl.split('/')[2]

      if (error || !user || roleDoesNotMatchEndpointUrl) {
         return res.clearCookie('token', cookie()).status(401).send({
            errorHeader: 'Authorization',
            errorMessage: 'The authentication cookie is invalid, log in again',
         })
      }

      req.user = user

      next()
   })(req, res, next)
}
