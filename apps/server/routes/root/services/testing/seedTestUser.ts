import { TEST_USER } from '@online-library/config'

import { User } from 'database'

import type { InitialBody, InitialCookies, InitialQuery, Route } from 'types/express'

export const seedTestUser: Route<InitialBody, InitialCookies, InitialQuery, 'default', false> = [
   async (_, res, next) => {
      try {
         const user = await User.findOne({ where: { email: TEST_USER.email } })

         if (user) {
            return res.send()
         }

         const { activationToken, ...testUser } = TEST_USER

         const newUser = await User.create(testUser)

         await newUser.createAuthentication({
            activationToken,
            authenticated: true,
         })

         res.send()
      } catch (error) {
         next(error)
      }
   },
]
