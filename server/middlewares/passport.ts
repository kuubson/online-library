import { PassportStatic } from 'passport'
import passportJwt from 'passport-jwt'
import FacebookTokenStrategy from 'passport-facebook-token'

import { User } from '../database/database'

import { IJWTData } from '../routes/global/services/checkToken'

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

export default (passport: PassportStatic) => {
    const extractJwtFromCookies = ({ cookies }) => cookies.token
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookies]),
                secretOrKey: process.env.JWT_KEY
            },
            async (data: IJWTData, done) => {
                const { email, role } = data
                if (role === 'user') {
                    const user = await User.findOne({
                        where: {
                            email
                        }
                    })
                    user
                        ? done(false, {
                              user,
                              role
                          })
                        : done(false, {})
                } else {
                    done(false, {})
                }
            }
        )
    )
    passport.use(
        new FacebookTokenStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET
            },
            (_, __, profile, done) => (profile ? done(false, true) : done(false, false))
        )
    )
}
