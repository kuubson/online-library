import passport from 'passport'

import type { Route } from 'types/express'

export const facebookAuthorization: Route = (req, res, next) =>
   passport.authenticate('facebook-token', { session: false })(req, res, next)
