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
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Checks if user already exists <br />
         ✅ Generates an <b>activation token</b> <br />
         ✅ Sends link with teh <b>token</b> to provided email address, to allow user activate his account
      #swagger.parameters['name'] = {
         in: 'body',
         description: 'User name',
         required: 'true',
         schema: { $ref: '#/definitions/name' }
      } 
      #swagger.parameters['email'] = {
         in: 'body',
         description: 'User email',
         required: 'true',
         schema: { $ref: '#/definitions/email' }
      } 
      #swagger.parameters['password'] = {
         in: 'body',
         description: 'User password. It gets hashed',
         required: 'true',
         schema: { $ref: '#/definitions/password' }
      } 
      #swagger.parameters['repeatedPassword'] = {
         in: 'body',
         description: 'User password. It is required just for the sake of validation',
         required: 'true',
         schema: { $ref: '#/definitions/password' }
      } 
    */
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
