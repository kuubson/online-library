import passport from 'passport'

import { Route } from 'types/express'

export const facebookAuthorization: Route = (req, res, next) =>
   passport.authenticate('facebook-token', { session: false })(req, res, next)
