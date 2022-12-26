import { TEST_USER } from '@online-library/config'

import { User } from 'database'

import type { InitialBody, InitialCookies, InitialQuery, Route } from 'types/express'

export const seedUser: Route<InitialBody, InitialCookies, InitialQuery, 'default', false> = [
   async (_, res, next) => {
      try {
         const user = await User.findOne({ where: { email: TEST_USER.email } })

         if (user) {
            return res.send()
         }

         const newUser = await User.create(TEST_USER)

         await newUser.createAuthentication({
            activationToken: '5t6q8wu9hodsng67et7tsdft867tdf76tsd',
            authenticated: true,
         })

         res.send()
      } catch (error) {
         next(error)
      }
   },
]
