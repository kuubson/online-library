import { cookie } from 'utils'

import { Route } from 'types/express'

export const logout: Route = (_, res, next) => {
   try {
      res.clearCookie('token', cookie()).send()
   } catch (error) {
      next(error)
   }
}
