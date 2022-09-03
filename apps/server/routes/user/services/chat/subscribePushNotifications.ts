import { API, yup } from 'online-library'

import { Connection } from 'database'

import { yupValidation } from 'middlewares'

import type { Body, ProtectedRoute } from 'types/express'

const schema = yup.object({ body: API.CHAT.subscribePushNotifications.schema })

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
