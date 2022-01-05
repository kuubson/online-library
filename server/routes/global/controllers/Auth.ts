import { Router } from 'express'

import { checkValidation } from 'middlewares'

import { auth } from '../services/'

export const Auth = Router()

Auth.get('/checkToken', auth.checkToken.validation(), checkValidation, auth.checkToken.checkToken)

Auth.get('/logout', auth.logout.logout)
