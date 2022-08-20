import jwt from 'jsonwebtoken'
import { Server, Socket as _Socket } from 'socket.io'

import { JWT_KEY } from 'config'

import { Message, User } from 'database'
import { User as UserClass } from 'database/models/User'

import { updateReadByProperty } from 'routes/user/services/chat/helpers'

import { cookie } from 'utils'

type Socket = _Socket & {
   user?: UserClass
}

export const user = (io: Server) => {
   const userIo = io.of('/user')

   userIo.use((socket: Socket, next) => {
      const token = cookie.getCookie(socket.request.headers.cookie, 'token')
      if (!token) {
         next(new Error())
      } else {
         jwt.verify(token, JWT_KEY, async (error: any, data: any) => {
            if (error) {
               return next(new Error())
            }

            const { email } = data

            try {
               const user = await User.findOne({ where: { email } })

               if (!user) {
                  return next(new Error())
               }

               socket.user = user

               next()
            } catch (error) {
               next(new Error())
            }
         })
      }
   })

   userIo.on('connection', (socket: Socket) => {
      const { id } = (socket as Required<Socket>).user

      socket.on('sendMessage', data => socket.broadcast.emit('sendMessage', data))

      socket.on('readMessages', async () => {
         const messages = await Message.findAll()
         await updateReadByProperty(id, messages)
      })
   })
}
