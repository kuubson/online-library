import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'
import * as _yup from 'yup'

import { JWT_KEY } from 'config'

import { ApiError } from 'utils'

_yup.addMethod<_yup.StringSchema>(_yup.string, 'jwt', function () {
   return this.test('test-jwt', 'Token is invalid', function (jwt) {
      try {
         if (jwt) {
            verify(jwt, JWT_KEY)
         }
      } catch (error) {
         if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
               throw new ApiError('Validation', 'Token has expired', 401)
            }
            throw new ApiError('Validation', 'Token is invalid', 401)
         }
      }
      return true
   })
})

declare module 'yup' {
   interface StringSchema extends _yup.BaseSchema {
      jwt(): StringSchema
   }
}

export const yup = _yup
