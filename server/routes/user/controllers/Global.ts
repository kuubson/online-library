import { Router } from 'express'

import { checkToken, logout } from '../services/global'

export const Global = Router()

Global.get(
   // #swagger.tags = ['Global']
   '/checkToken',
   ...checkToken
)

Global.get(
   // #swagger.tags = ['Global']
   '/logout',
   ...logout
)
