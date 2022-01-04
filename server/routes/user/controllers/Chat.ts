import { Router } from 'express'

import middlewares from 'middlewares'

import chat from '../services/chat'

const router = Router()

router.post(
    '/getMessages',
    middlewares.jwtAuthorization,
    chat.getMessages.validation(),
    middlewares.checkValidation,
    chat.getMessages.default as any
)

router.post(
    '/sendMessage',
    middlewares.jwtAuthorization,
    chat.sendMessage.validation(),
    middlewares.checkValidation,
    chat.sendMessage.default as any
)

router.post(
    '/sendFile',
    middlewares.jwtAuthorization,
    middlewares.handleMulterFile() as any,
    chat.sendFile.default as any
)

router.post(
    '/subscribePushNotifications',
    middlewares.jwtAuthorization,
    chat.subscribePushNotifications.validation(),
    middlewares.checkValidation,
    chat.subscribePushNotifications.default as any
)

router.get(
    '/getUnreadMessagesInfo',
    middlewares.jwtAuthorization,
    chat.getUnreadMessagesInfo.default as any
)

export default router
