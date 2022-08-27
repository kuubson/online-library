import { Router } from 'express'

import { facebookAuthorization, rateLimiter } from 'middlewares'

import {
   authenticateEmail,
   changePassword,
   checkPasswordToken,
   checkToken,
   login,
   loginWithFacebook,
   logout,
   recoverPassword,
   register,
   resendEmail,
} from '../services/auth'

export const Auth = Router()

Auth.use(rateLimiter())

Auth.get('/checkToken', ...checkToken)

Auth.get('/logout', ...logout)

Auth.post('/register', ...register)

Auth.post('/authenticateEmail', ...authenticateEmail)

Auth.post('/resendEmail', ...resendEmail)

Auth.post('/login', ...login)

Auth.post('/loginWithFacebook', facebookAuthorization, ...loginWithFacebook)

Auth.post('/recoverPassword', ...recoverPassword)

Auth.post('/checkPasswordToken', ...checkPasswordToken)

Auth.post('/changePassword', ...changePassword)
