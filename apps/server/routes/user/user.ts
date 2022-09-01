import { Router } from 'express'

import { Auth, Books, Cart, Chat } from './controllers'

export const User = Router()

User.use('/auth', Auth)
User.use('/books', Books)
User.use('/cart', Cart)
User.use('/chat', Chat)
