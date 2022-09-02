import { API, integer } from 'online-library'

import { Message, User } from 'database'

import { yupValidation } from 'middlewares'

import { updateReadByProperty, yup } from 'helpers'

import type { Body, ProtectedRoute } from 'types/express'

const ENDPOINT = API.CHAT.getMessages

const schema = yup.object({
   body: yup.object({
      limit: integer,
      offset: integer,
   }),
})

export const getMessages: ProtectedRoute<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { id, name } = req.user

         const { limit, offset } = req.body

         const messages = await Message.findAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            include: [
               {
                  model: User,
                  attributes: ['name'],
               },
            ],
         }).then(messages => messages.sort((a, b) => a.id - b.id))

         const { updatedMessages } = await updateReadByProperty(id, messages)

         const messagesWithUserNames = updatedMessages.map(message => ({
            ...message.get({ plain: true }),
            userName: message.user?.name,
         }))

         res.send({
            messages: messagesWithUserNames,
            userId: id,
            userName: name,
         })
      } catch (error) {
         next(error)
      }
   },
]
