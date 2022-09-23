/* eslint-disable @typescript-eslint/no-unused-vars */
import passport from 'passport'

import type { Role } from '@online-library/config'
import { AuthError } from '@online-library/config'

import { cookie } from 'utils'

import type {
   CustomRequest,
   InitialBody,
   InitialCookies,
   InitialQuery,
   Middleware,
} from 'types/express'

export const jwtAuthorization: Middleware<
   InitialBody,
   InitialCookies,
   InitialQuery,
   'protected'
> = (req, res, next) => {
   passport.authenticate(
      'jwt',
      { session: false },
      (error, { user, role }: CustomRequest['user']) => {
         const [_, __, roleFromRequestUrl] = req.originalUrl.split('/') as [string, string, Role]

         if (error || !user || role !== roleFromRequestUrl) {
            return res.clearCookie('authToken', cookie()).status(401).send(AuthError)
         }

         req.user = user

         next()
      }
   )(req, res, next)
}
