import { verify } from 'jsonwebtoken'

import type { Role } from 'online-library'
import { AuthError, yup } from 'online-library'

import { JWT_KEY } from 'config'

import { yupValidation } from 'middlewares'

import { cookie, jwt } from 'utils'

import type { AuthTokenData } from 'types'
import type { Cookies, InitialBody, Route } from 'types/express'

const schema = yup.object({ cookies: yup.object({ token: jwt.optional() }) })

export const checkToken: Route<InitialBody, Cookies<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { token } = req.cookies

         if (!token) {
            return res.clearCookie('token', cookie()).send({ role: 'guest' as Role })
         }

         const { role } = verify(token, JWT_KEY) as AuthTokenData

         if (role === 'user') {
            return res.send({ role: 'user' as Role })
         }

         throw AuthError
      } catch (error) {
         next(error)
      }
   },
]
