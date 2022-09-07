import { Message } from 'database'

import type { InitialBody, InitialCookies, ProtectedRoute } from 'types/express'

export const getMessagesInfo: ProtectedRoute<InitialBody, InitialCookies, false> = [
   async (req, res, next) => {
      try {
         const { id } = req.user

         const messages = await Message.findAll()

         let lastUnreadMessageIndex: number | undefined

         let unreadMessagesAmount = 0

         messages.map(({ readBy }, index) => {
            const readByIds = readBy.split(',').filter(id => id)
            if (!readByIds.includes(id.toString())) {
               unreadMessagesAmount++
               if (!lastUnreadMessageIndex) {
                  lastUnreadMessageIndex = messages.length - index
               }
            }
         })

         res.send({
            lastUnreadMessageIndex,
            unreadMessagesAmount,
            userId: id,
         })
      } catch (error) {
         next(error)
      }
   },
]
