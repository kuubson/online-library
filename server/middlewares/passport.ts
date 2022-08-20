import { PassportStatic } from 'passport'
import FacebookTokenStrategy from 'passport-facebook-token'
import passportJwt from 'passport-jwt'

import { User } from 'database'

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

type Cookies = {
   cookies: {
      token: string
   }
}

export const initializePassport = (passport: PassportStatic) => {
   const extractJwtFromCookies = ({ cookies }: Cookies) => cookies.token
   passport.use(
      new JwtStrategy(
         {
            jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookies]),
            secretOrKey: process.env.JWT_KEY,
         },
         async (data, done) => {
            const { email, role } = data
            if (role === 'user') {
               const user = await User.findOne({
                  where: {
                     email,
                  },
               })
               return user
                  ? done(false, {
                       user,
                       role,
                    })
                  : done(false, {})
            }
            done(false, {})
         }
      )
   )
   passport.use(
      new FacebookTokenStrategy(
         {
            clientID: process.env.REACT_APP_FACEBOOK_APP_ID!,
            clientSecret: process.env.FACEBOOK_APP_SECRET!,
         },
         (_, __, profile, done) => (profile ? done(false, true) : done(false, false))
      )
   )
}
