import { Router } from 'express'

import { checkToken, logout } from '../services/global'

export const Global = Router()

Global.get('/checkToken', ...checkToken)

Global.get('/logout', ...logout)
