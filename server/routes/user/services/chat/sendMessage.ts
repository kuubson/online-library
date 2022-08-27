import { Connection } from 'database'

import { yupValidation } from 'middlewares'

import { sendNotificationsForOtherUsers, yup } from 'helpers'

import { baseUrl } from 'utils'

import type { ProtectedRoute } from 'types/express'

export const sendMessage: ProtectedRoute = [
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
               icon: 'https://picsum.photos/1920/1080',
               data: {
                  userName: name,
                  url: `${baseUrl(req)}/chat`,
               },
            })

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
   yupValidation({ body: { content: yup.string().trim() } }),
]
