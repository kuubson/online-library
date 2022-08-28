import passport from 'passport'

import type { Middleware } from 'types/express'

export const facebookAuthorization: Middleware = (req, res, next) =>
   passport.authenticate('facebook-token', { session: false })(req, res, next)
