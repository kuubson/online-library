import { Connection } from 'database'

import { string } from 'shared'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import type { Body } from 'types/express'
import { type ProtectedRoute } from 'types/express'

const schema = yup.object({
   body: yup.object({
      endpoint: string,
      keys: yup.object({
         auth: string,
         p256dh: string,
      }),
   }),
})

export const subscribePushNotifications: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
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
   },
]
