import { Router } from 'express'

import middlewares from '../../middlewares'

import Services from './services'

const router = Router()

router.get(
    '/checkToken',
    Services.checkToken.validation(),
    middlewares.checkValidation,
    Services.checkToken.default
)

export default router
