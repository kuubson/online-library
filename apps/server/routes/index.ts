import express from 'express'

import { RootController } from './root/controllers'
import { UserController } from './user/controllers'

export const router = express.Router()

router.use(RootController)
router.use(UserController)
