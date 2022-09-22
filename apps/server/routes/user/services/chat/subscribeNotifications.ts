import { API, yup } from '@online-library/core'

import { Connection } from 'database'

import { yupValidation } from 'middlewares'

import type { Body, ProtectedRoute } from 'types/express'

const { validation } = API['/api/user/chat/notifications'].post

const schema = yup.object({ body: validation })

export const subscribeNotifications: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const {
               endpoint,
               keys: { p256dh, auth },
            } = req.body

            const subscriptions = await req.user.getSubscriptions()

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

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
