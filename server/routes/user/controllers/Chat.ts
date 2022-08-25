import { Router } from 'express'

import { handleMulterFile, jwtAuthorization } from 'middlewares'

import { chat } from '../services'

export const Chat = Router()

Chat.post(
   '/getMessages',
   jwtAuthorization,
   chat.getMessages.validation,
   chat.getMessages.getMessages
)

Chat.post(
   '/sendMessage',
   jwtAuthorization,
   chat.sendMessage.validation,
   chat.sendMessage.sendMessage
)

Chat.post('/sendFile', jwtAuthorization, handleMulterFile, chat.sendFile.sendFile)

Chat.post(
   '/subscribePushNotifications',
   jwtAuthorization,
   chat.subscribePushNotifications.validation,
   chat.subscribePushNotifications.subscribePushNotifications
)

Chat.get('/getMessagesInfo', jwtAuthorization, chat.getMessagesInfo.getMessagesInfo)
