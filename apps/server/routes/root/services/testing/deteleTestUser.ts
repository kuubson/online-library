import { TEST_USER } from '@online-library/config'

import { User } from 'database'

import type { InitialBody, InitialCookies, InitialQuery, Route } from 'types/express'

export const deteleTestUser: Route<InitialBody, InitialCookies, InitialQuery, 'default', false> = [
   async (_, res, next) => {
      try {
         const user = await User.findOne({ where: { email: TEST_USER.email } })

         if (user) {
            await user.destroy()
         }

         res.send()
      } catch (error) {
         next(error)
      }
   },
]
