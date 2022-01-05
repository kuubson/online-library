import { Router } from 'express'

import { Auth } from './controllers'

export const Global = Router()

Global.use('/auth', Auth)
