import { verify } from 'jsonwebtoken'

import type { Role } from '@online-library/core'
import { AuthError, roles, yup } from '@online-library/core'

import { JWT_KEY } from 'config'

import { yupValidation } from 'middlewares'

import { cookie, jwt } from 'utils'

import type { AuthTokenData } from 'types'
import type { Cookies, InitialBody, Route } from 'types/express'

const schema = yup.object({ cookies: yup.object({ authToken: jwt.optional() }) })

export const checkAuth: Route<InitialBody, Cookies<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { authToken } = req.cookies

         if (!authToken) {
            return res.clearCookie('authToken', cookie()).send({ role: 'guest' as Role })
         }

         const { role } = verify(authToken, JWT_KEY) as AuthTokenData

         if (!roles.includes(role)) {
            throw AuthError
         }

         return res.send({ role })
      } catch (error) {
         next(error)
      }
   },
]
