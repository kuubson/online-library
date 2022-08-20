import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { Connection, User } from 'database'

import { validator } from 'helpers'

import { ApiError, cookie } from 'utils'

import { AuthTokenData } from 'types'
import { Route } from 'types/express'

export const checkToken: Route = async (req, res, next) => {
   await Connection.transaction(async transaction => {
      try {
         const { token } = req.cookies

         if (!token) {
            return res.clearCookie('token', cookie()).send({ role: 'guest' })
         }

         const { role, email } = verify(token, JWT_KEY) as AuthTokenData

         switch (true) {
            case role === 'user': {
               const user = await User.findOne({
                  where: { email },
                  transaction,
               })

               if (!user) {
                  throw new ApiError(
                     'Authorization',
                     'The authentication cookie is invalid, log in again',
                     401
                  )
               }

               return res.send({ role: 'user' })
            }
            default: {
               throw new ApiError(
                  'Authorization',
                  'The authentication cookie is invalid, log in again',
                  401
               )
            }
         }
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
   })
}

export const validation = () => [validator.validateProperty('token').optional()]
