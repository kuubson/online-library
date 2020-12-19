import passport from 'passport'

export default (req, res, next) =>
    passport.authenticate('facebook-token', { session: false })(req, res, next)
