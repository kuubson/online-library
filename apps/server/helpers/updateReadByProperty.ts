import type { Message } from 'database/models/Message'

export const updateReadByProperty = async (userId: number, messages: Message[]) => {
   const updatedMessages = await Promise.all(
      messages.map(async message => {
         const readByIds = message.readBy.split(',').filter(id => id)

         const ID = userId.toString()

         if (!readByIds.includes(ID)) {
            readByIds.push(ID)
         }

         await message.update({ readBy: readByIds.join(',') })

         return message
      })
   )
   return { updatedMessages }
}
