import passport from 'passport'

import { FBError } from 'online-library'

import type { Middleware } from 'types/express'

export const facebookAuthorization: Middleware = (req, res, next) =>
   passport.authenticate('facebook-token', { session: false }, error => {
      if (error) {
         next(FBError)
      }
      next()
   })(req, res, next)
