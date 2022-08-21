import type { Message } from 'database/models/Message'

type ReadByPropertyUpdater = (userId: number, messages: Message[]) => Promise<Message[]>

export const updateReadByProperty: ReadByPropertyUpdater = async (userId, messages) => {
   return Promise.all(
      messages.map(async message => {
         const readByIds = message.readBy.split(',').filter(v => v)

         const ID = userId.toString()

         if (!readByIds.includes(ID)) {
            readByIds.push(ID)
         }

         await message.update({ readBy: readByIds.join(',') })

         return message
      })
   )
}
