import passport from 'passport'

const facebookAuthorization = (req, res, next) =>
    passport.authenticate('facebook-token', { session: false })(req, res, next)

export default facebookAuthorization
