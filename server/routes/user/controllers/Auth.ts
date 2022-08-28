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

Auth.post(
   // #swagger.tags = ['Auth']
   '/register',
   ...register
)

Auth.post(
   // #swagger.tags = ['Auth']
   '/authenticateEmail',
   ...authenticateEmail
)

Auth.post(
   // #swagger.tags = ['Auth']
   '/resendEmail',
   ...resendEmail
)

Auth.post(
   // #swagger.tags = ['Auth']
   '/login',
   ...login
)

Auth.post(
   // #swagger.tags = ['Auth']
   '/loginWithFacebook',
   facebookAuthorization,
   ...loginWithFacebook
)

Auth.post(
   // #swagger.tags = ['Auth']
   '/recoverPassword',
   ...recoverPassword
)

Auth.post(
   // #swagger.tags = ['Auth']
   '/checkPasswordToken',
   ...checkPasswordToken
)

Auth.post(
   // #swagger.tags = ['Auth']
   '/changePassword',
   ...changePassword
)
