import { Connection } from 'database'

import { string } from 'shared'

import { yupValidation } from 'middlewares'

import type { ProtectedRoute } from 'types/express'

export const subscribePushNotifications: ProtectedRoute = async (req, res, next) => {
   try {
      await Connection.transaction(async transaction => {
         const {
            endpoint,
            keys: { p256dh, auth },
         } = req.body

         await req.user.getSubscriptions().then(async subscriptions => {
            if (!subscriptions.some(subscription => subscription.endpoint === endpoint)) {
               await req.user.createSubscription(
                  {
                     endpoint,
                     p256dh,
                     auth,
                  },
                  { transaction }
               )
            }
         })

         res.send()
      })
   } catch (error) {
      next(error)
   }
}

export const validation = yupValidation({
   body: {
      endpoint: string,
      'keys.p256dh': string,
      'keys.auth': string,
   },
})
