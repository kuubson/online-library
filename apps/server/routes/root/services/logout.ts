import type { Role } from '@online-library/tools'
import { yup } from '@online-library/tools'

import { yupValidation } from 'middlewares'

import { cookie, jwt } from 'utils'

import type { Cookies, InitialBody, Route } from 'types/express'

const schema = yup.object({ cookies: yup.object({ authToken: jwt.optional() }) })

export const logout: Route<InitialBody, Cookies<typeof schema>> = [
   yupValidation({ schema }),
   (_, res, next) => {
      try {
         res.clearCookie('authToken', cookie()).send({ role: 'guest' as Role })
      } catch (error) {
         next(error)
      }
   },
]
