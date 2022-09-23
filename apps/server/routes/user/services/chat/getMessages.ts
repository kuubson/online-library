import { API, MESSAGES_ORDER, yup } from '@online-library/config'

import { Message, User } from 'database'

import { yupValidation } from 'middlewares'

import { updateReadByProperty } from 'helpers'

import type { InitialBody, InitialQuery, ProtectedRoute, Query } from 'types/express'

const { validation } = API['/api/user/chat/messages'].get

const schema = yup.object({ query: validation })

export const getMessages: ProtectedRoute<InitialBody, InitialQuery, Query<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { id, name } = req.user

         const { limit, offset } = req.query

         const messages = await Message.findAll({
            limit: Number(limit),
            offset: Number(offset),
            order: [['id', 'DESC']],
            include: [
               {
                  model: User,
                  attributes: ['name'],
               },
            ],
         }).then(messages => messages.sort(MESSAGES_ORDER))

         const { updatedMessages } = await updateReadByProperty(id, messages)

         res.send({
            messages: updatedMessages,
            userId: id,
            userName: name,
         })
      } catch (error) {
         next(error)
      }
   },
]
