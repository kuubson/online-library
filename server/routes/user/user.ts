import { Router } from 'express'

import middlewares from '../../middlewares'

import Services from './services'

const router = Router()

router.post(
    '/register',
    Services.register.validation(),
    middlewares.checkValidation,
    Services.register.default
)

router.post(
    '/authenticateEmail',
    Services.authenticateEmail.validation(),
    middlewares.checkValidation,
    Services.authenticateEmail.default
)

export default router
