import { Router } from 'express'

import { Auth } from './Auth'
import { Books } from './Books'
import { Cart } from './Cart'
import { Chat } from './Chat'

export const UserController = Router()

UserController.use(Auth)
UserController.use(Books)
UserController.use(Cart)
UserController.use(Chat)
