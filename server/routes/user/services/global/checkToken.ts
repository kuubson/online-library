import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { ApiError, cookie } from 'utils'

import type { AuthTokenData } from 'types'
import type { Route } from 'types/express'

const schema = yup.object({ cookies: yup.object({ token: yup.string().jwt() }) })

export const checkToken: Route = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { token } = req.cookies // TODO: inherit cookies type from schema

         if (!token) {
            return res.clearCookie('token', cookie()).send({ role: 'guest' })
         }

         const { role } = verify(token, JWT_KEY) as AuthTokenData

         if (role === 'user') {
            return res.send({ role: 'user' })
         }

         throw new ApiError(
            'Authorization',
            'The authentication cookie is invalid, log in again',
            401
         )
      } catch (error) {
         if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
               throw new ApiError(
                  'Authorization',
                  'The authentication cookie has expired, log in again',
                  401
               )
            }
            throw new ApiError(
               'Authorization',
               'The authentication cookie is invalid, log in again',
               401
            )
         }
         next(error)
      }
   },
]
