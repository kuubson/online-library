import { Router } from 'express'

import middlewares from '@middlewares'

import chat from '../services/chat'

const router = Router()

router.post(
    '/getMessages',
    middlewares.jwtAuthorization,
    chat.getMessages.validation(),
    middlewares.checkValidation,
    chat.getMessages.default
)

router.post(
    '/sendMessage',
    middlewares.jwtAuthorization,
    chat.sendMessage.validation(),
    middlewares.checkValidation,
    chat.sendMessage.default
)

router.post(
    '/sendFile',
    middlewares.jwtAuthorization,
    middlewares.handleMulterFile(),
    chat.sendFile.default
)

router.post(
    '/subscribePushNotifications',
    middlewares.jwtAuthorization,
    chat.subscribePushNotifications.validation(),
    middlewares.checkValidation,
    chat.subscribePushNotifications.default
)

router.get(
    '/getUnreadMessagesInfo',
    middlewares.jwtAuthorization,
    chat.getUnreadMessagesInfo.default
)

export default router
