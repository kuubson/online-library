import { API, RANDOM_IMAGE, yup } from '@online-library/config'

import { Connection } from 'database'

import { yupValidation } from 'middlewares'

import { sendNotificationsForOtherUsers } from 'helpers'

import { hostUrl } from 'utils'

import type { Body, ProtectedRoute } from 'types/express'

const { validation } = API['/api/user/chat/messages'].post

const schema = yup.object({ body: validation })

export const sendMessage: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { id, name } = req.user

            const { content } = req.body

            await req.user.createMessage(
               {
                  type: 'MESSAGE',
                  content,
                  readBy: id as unknown as string,
               },
               { transaction }
            )

            sendNotificationsForOtherUsers(id, {
               tag: id,
               title: `From ${name}`,
               body: `${content}`,
               icon: RANDOM_IMAGE,
               data: {
                  userName: name,
                  url: `${hostUrl(req)}/chat`,
               },
            })

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
