import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

import { ApiError, yup } from 'online-library'

import { JWT_KEY } from 'config'

export const jwt = yup
   .string()
   .required()
   .test('test-jwt', function (jwt) {
      try {
         if (jwt) {
            verify(jwt, JWT_KEY)
         }
      } catch (error) {
         if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
               throw new ApiError(
                  'Request processing',
                  'Token required by this action has expired',
                  422
               )
            }
            throw new ApiError(
               'Request processing',
               'Token required by this action is invalid',
               422
            )
         }
      }
      return true
   })
