import passport from 'passport'

const jwtAuthorization = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, { user, role }) => {
        if (error || !user || role !== req.originalUrl.split('/')[2]) {
            return res
                .clearCookie('token', {
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: true
                })
                .status(401)
                .send({
                    errorHeader: 'Authorization',
                    errorMessage: 'The authentication cookie is invalid, log in again'
                })
        }
        req.user = user
        next()
    })(req, res, next)
}

export default jwtAuthorization
