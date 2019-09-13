const User = require('../database/schemas/user')

module.exports = passport => {
    const extractTokenFromCookies = req => {
        if (req.cookies.token) return req.cookies.token
        else return null
    }
    const extractTokenFromRequest = req => {
        if (req.body.token) return req.body.token
        else return null
    }
    const passportJwt = require('passport-jwt')
    const JwtStrategy = passportJwt.Strategy
    const ExtractJwt = passportJwt.ExtractJwt;
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromExtractors([extractTokenFromCookies, extractTokenFromRequest]);
    opts.secretOrKey = process.env.JWT_KEY;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ email: jwt_payload.email }, (error, user) => {
            if (error) {
                return done(error, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}