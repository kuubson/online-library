import { Router } from 'express'

import { handleMulterFile } from 'middlewares'

import {
   getMessages,
   getMessagesInfo,
   sendFile,
   sendMessage,
   subscribePushNotifications,
} from '../services/chat'

export const Chat = Router()

Chat.post(
   // #swagger.tags = ['Chat']
   '/getMessages',
   ...getMessages
)

Chat.post(
   // #swagger.tags = ['Chat']
   '/sendMessage',
   ...sendMessage
)

Chat.post(
   // #swagger.tags = ['Chat']
   '/sendFile',
   handleMulterFile,
   ...sendFile
)

Chat.post(
   // #swagger.tags = ['Chat']
   '/subscribePushNotifications',
   ...subscribePushNotifications
)

Chat.get(
   // #swagger.tags = ['Chat']
   '/getMessagesInfo',
   ...getMessagesInfo
)
