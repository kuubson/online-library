const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_OR_KEY
    }, (payload, done) => {
        User.findOne({
            _id: payload.id,
            email: payload.email
        }).then(user => {
            if (!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        })
    }))
}