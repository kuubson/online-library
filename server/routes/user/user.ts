import { Router } from 'express'

import Services from './services'

const router = Router()

router.post('/login', Services.login)

export default router
