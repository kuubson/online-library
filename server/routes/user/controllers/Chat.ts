import { Router } from 'express'

import { handleMulterFile, jwtAuthorization } from 'middlewares'

import {
   getMessages,
   getMessagesInfo,
   sendFile,
   sendMessage,
   subscribePushNotifications,
} from '../services/chat'

export const Chat = Router()

Chat.use(jwtAuthorization)

Chat.post('/getMessages', ...getMessages)

Chat.post('/sendMessage', ...sendMessage)

Chat.post('/sendFile', handleMulterFile, ...sendFile)

Chat.post('/subscribePushNotifications', ...subscribePushNotifications)

Chat.get('/getMessagesInfo', ...getMessagesInfo)
