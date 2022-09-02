import { verify } from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { ApiError, cookie } from 'utils'

import type { AuthTokenData } from 'types'
import type { Cookies, InitialBody, Route } from 'types/express'

const schema = yup.object({ cookies: yup.object({ token: yup.string().jwt() }) })

export const checkToken: Route<InitialBody, Cookies<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { token } = req.cookies

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
         next(error)
      }
   },
]
