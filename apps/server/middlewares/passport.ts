import type { PassportStatic } from 'passport'
import FacebookTokenStrategy from 'passport-facebook-token'
import passportJwt from 'passport-jwt'

import { FACEBOOK_APP_SECRET, JWT_KEY, REACT_APP_FACEBOOK_APP_ID } from 'config'

import { User } from 'database'

import type { AuthTokenData } from 'types'

const { Strategy, ExtractJwt } = passportJwt

type Cookies = {
   cookies: {
      token: string
   }
}

const extractJwtFromCookies = ({ cookies }: Cookies) => cookies.token

export const initializePassport = (passport: PassportStatic) => {
   passport.use(
      new Strategy(
         {
            jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookies]),
            secretOrKey: JWT_KEY,
         },
         async (data: AuthTokenData, done) => {
            const { email, role } = data

            if (role === 'user') {
               const user = await User.findOne({ where: { email } })

               if (!user) {
                  return done(false, {})
               }

               return done(false, {
                  user,
                  role,
               })
            }

            done(false, {})
         }
      )
   )
   passport.use(
      new FacebookTokenStrategy(
         {
            clientID: REACT_APP_FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
         },
         (_, __, profile, done) => (profile ? done(false, true) : done(false, false))
      )
   )
}
