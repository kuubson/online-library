const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
}
const User = require('../models/User');
const strategy = new JwtStrategy(options, (payload, done) => {
    User.findOne({
        email: payload.email
    }).then(user => {
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
})

module.exports = (passport) => {
    passport.use(strategy);
}