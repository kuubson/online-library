import { check } from 'express-validator'

import { Connection } from 'database'

import { baseUrl } from 'utils'

import { ProtectedRoute } from 'types/express'

import { sendNotificationsForOtherUsers } from './helpers'

export const sendMessage: ProtectedRoute = async (req, res, next) => {
   try {
      await Connection.transaction(async transaction => {
         const { id, name } = req.user

         const { content } = req.body

         await req.user.createMessage(
            {
               type: 'MESSAGE',
               content,
               readBy: id,
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
}

export const validation = () => [check('content').trim().isString().bail()]
