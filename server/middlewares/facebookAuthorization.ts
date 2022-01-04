import passport from 'passport'

import { Route } from 'types/global'

const facebookAuthorization: Route = (req, res, next) =>
    passport.authenticate('facebook-token', { session: false })(req, res, next)

export default facebookAuthorization
