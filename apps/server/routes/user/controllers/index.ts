import { Router } from 'express'

import { jwtAuthorization, rateLimiter } from 'middlewares'

import { Auth } from './Auth'
import { Books } from './Books'
import { Cart } from './Cart'
import { Chat } from './Chat'
import { Global } from './Global'

export const UserController = Router()

UserController.use('/api/user/auth/', rateLimiter(), Auth)
UserController.use('/api/user/books/', jwtAuthorization, Books)
UserController.use('/api/user/cart/', jwtAuthorization, Cart)
UserController.use('/api/user/chat/', jwtAuthorization, Chat)
UserController.use('/api/user/global/', Global)
