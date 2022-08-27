import passport from 'passport'

import type { RouteType } from 'types/express'

export const facebookAuthorization: RouteType = (req, res, next) =>
   passport.authenticate('facebook-token', { session: false })(req, res, next)
