import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { cookie } from 'utils'

import type { Route } from 'types/express'

export const logout: Route = [
   () => yupValidation({ cookies: { token: yup.string().jwt() } }),
   (_, res, next) => {
      try {
         res.clearCookie('token', cookie()).send()
      } catch (error) {
         next(error)
      }
   },
]
