import { verify } from 'jsonwebtoken'
import type { Server, Socket as _Socket } from 'socket.io'
import type { ExtendedError } from 'socket.io/dist/namespace'

import { JWT_KEY } from 'config'

import { Message, User } from 'database'
import type { User as UserType } from 'database/models/User'

import { getCookie, updateReadByProperty } from 'helpers'

import type { AuthTokenData } from 'types'

type Socket = _Socket & {
   user?: UserType
}

export const user = (io: Server) => {
   const userIo = io.of('/user')

   userIo.use(async (socket: Socket, next) => {
      try {
         const authToken = getCookie(socket.request.headers.cookie, 'authToken')

         if (!authToken) {
            throw new Error()
         }

         const { email } = verify(authToken, JWT_KEY) as AuthTokenData

         const user = await User.findOne({ where: { email } })

         if (!user) {
            throw new Error()
         }

         socket.user = user

         next()
      } catch (error) {
         next(error as ExtendedError)
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
