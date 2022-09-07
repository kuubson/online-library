import { API, yup } from 'online-library'

import { Message, User } from 'database'

import { yupValidation } from 'middlewares'

import { updateReadByProperty } from 'helpers'

import type { Body, ProtectedRoute } from 'types/express'

const schema = yup.object({ body: API.getMessages.validation })

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
