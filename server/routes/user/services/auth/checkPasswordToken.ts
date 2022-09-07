import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { User } from 'database'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { ApiError } from 'utils'

import type { PasswordTokendata } from 'types'
import type { Body, Route } from 'types/express'

const schema = yup.object({ body: yup.object({ passwordToken: yup.string().jwt().required() }) })

export const checkPasswordToken: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { passwordToken } = req.body

         const { email } = verify(passwordToken, JWT_KEY) as PasswordTokendata

         const user = await User.findOne({
            where: {
               email,
               passwordToken,
            },
         })

         if (!user) {
            throw new ApiError('Password recovery', 'The password recovery link is invalid', 400)
         }

         res.send()
      } catch (error) {
         if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
               throw new ApiError(
                  'Password recovery',
                  'The password recovery link has expired',
                  400
               )
            }
            throw new ApiError('Password recovery', 'The password recovery link is invalid', 400)
         }
         next(error)
      }
   },
]
