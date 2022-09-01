import { Router } from 'express'

import { jwtAuthorization, handleMulterFile, checkValidation } from 'middlewares'

import { chat } from '../services'

export const Chat = Router()

Chat.post(
    '/getMessages',
    jwtAuthorization,
    chat.getMessages.validation(),
    checkValidation,
    chat.getMessages.getMessages as any
)

Chat.post(
    '/sendMessage',
    jwtAuthorization,
    chat.sendMessage.validation(),
    checkValidation,
    chat.sendMessage.sendMessage as any
)

Chat.post('/sendFile', jwtAuthorization, handleMulterFile() as any, chat.sendFile.sendFile as any)

Chat.post(
    '/subscribePushNotifications',
    jwtAuthorization,
    chat.subscribePushNotifications.validation(),
    checkValidation,
    chat.subscribePushNotifications.subscribePushNotifications as any
)

Chat.get('/getMessagesInfo', jwtAuthorization, chat.getMessagesInfo.getMessagesInfo as any)
