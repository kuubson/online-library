import { yup } from 'online-library'

import { Connection } from 'database'

import { yupValidation } from 'middlewares'

import { sendNotificationsForOtherUsers } from 'helpers'

import { baseUrl } from 'utils'

import type { Body, ProtectedRoute } from 'types/express'

const schema = yup.object({ body: yup.object({ content: yup.string().required().trim() }) })

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
]
