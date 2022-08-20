import { Message } from 'database'

import { ProtectedRoute } from 'types/express'

export const getMessagesInfo: ProtectedRoute = async (req, res, next) => {
   try {
      const { id } = req.user

      const messages = await Message.findAll()

      const countUnreadMessagesInfo = () => {
         let lastUnreadMessageIndex: number | undefined

         let unreadMessagesAmount = 0

         messages.map(({ readBy }, index) => {
            const readByIds = readBy.split(',').filter(v => v)
            if (!readByIds.includes(id.toString())) {
               unreadMessagesAmount++
               if (!lastUnreadMessageIndex) {
                  lastUnreadMessageIndex = messages.length - index
               }
            }
         })

         return {
            lastUnreadMessageIndex,
            unreadMessagesAmount,
         }
      }

      const { lastUnreadMessageIndex, unreadMessagesAmount } = countUnreadMessagesInfo()

      res.send({
         lastUnreadMessageIndex,
         unreadMessagesAmount,
         userId: id,
      })
   } catch (error) {
      next(error)
   }
}
