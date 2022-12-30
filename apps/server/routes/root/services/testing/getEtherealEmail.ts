import { EtherealEmail } from 'database'

import type { InitialBody, InitialCookies, InitialQuery, Route } from 'types/express'

export const getEtherealEmail: Route<InitialBody, InitialCookies, InitialQuery, 'default', false> =
   [
      async (_, res, next) => {
         try {
            const etherealEmail = await EtherealEmail.findOne({ order: [['id', 'DESC']] })
            res.send({ url: etherealEmail?.url })
         } catch (error) {
            next(error)
         }
      },
   ]
