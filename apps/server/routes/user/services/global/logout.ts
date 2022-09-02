import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { cookie } from 'utils'

import type { Cookies, InitialBody, Route } from 'types/express'

const schema = yup.object({ cookies: yup.object({ token: yup.string().jwt() }) })

export const logout: Route<InitialBody, Cookies<typeof schema>> = [
   yupValidation({ schema }),
   (_, res, next) => {
      try {
         res.clearCookie('token', cookie()).send()
      } catch (error) {
         next(error)
      }
   },
]