import express from 'express'

import { UserController } from './user/controllers'

export const router = express.Router()

router.use(UserController)
