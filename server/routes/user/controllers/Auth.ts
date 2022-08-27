import { Router } from 'express'

import { facebookAuthorization } from 'middlewares'

import {
   authenticateEmail,
   changePassword,
   checkPasswordToken,
   login,
   loginWithFacebook,
   recoverPassword,
   register,
   resendEmail,
} from '../services/auth'

export const Auth = Router()

Auth.post('/register', ...register)

Auth.post('/authenticateEmail', ...authenticateEmail)

Auth.post('/resendEmail', ...resendEmail)

Auth.post('/login', ...login)

Auth.post('/loginWithFacebook', facebookAuthorization, ...loginWithFacebook)

Auth.post('/recoverPassword', ...recoverPassword)

Auth.post('/checkPasswordToken', ...checkPasswordToken)

Auth.post('/changePassword', ...changePassword)
