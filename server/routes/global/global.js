import { Router } from 'express'

import Controllers from './controllers'

const router = Router()

router.use('/auth', Controllers.Auth)

export default router
