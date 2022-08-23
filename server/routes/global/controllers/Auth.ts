import { Router } from 'express'

import { auth } from '../services/'

export const Auth = Router()

Auth.get('/checkToken', auth.checkToken.validation, auth.checkToken.checkToken)

Auth.get('/logout', auth.logout.validation, auth.logout.logout)
