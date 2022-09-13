import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

import { ExpiredToken, InvalidToken, yup } from '@online-library/tools'

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
               throw ExpiredToken
            }
            throw InvalidToken
         }
      }
      return true
   })
