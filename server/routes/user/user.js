import { Router } from 'express'

import Controllers from './controllers'

const router = Router()

router.use('/auth', Controllers.Auth)
router.use('/books', Controllers.Books)
router.use('/cart', Controllers.Cart)
router.use('/chat', Controllers.Chat)

export default router
