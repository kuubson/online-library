import { Router } from 'express'

import middlewares from 'middlewares'

import auth from '../services/auth'

const router = Router()

router.get(
    '/checkToken',
    auth.checkToken.validation(),
    middlewares.checkValidation,
    auth.checkToken.default
)

router.get('/logout', auth.logout.default)

export default router
