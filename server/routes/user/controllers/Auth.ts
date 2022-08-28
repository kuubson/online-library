import { Router } from 'express'

import { facebookAuthorization } from 'middlewares'

import {
   activateAccount,
   changePassword,
   checkPasswordToken,
   login,
   loginWithFacebook,
   recoverPassword,
   register,
   resendActivationToken,
} from '../services/auth'

export const Auth = Router()

Auth.post(
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Checks if user already exists <br />
         ✅ Generates an <b>activation token</b> <br />
         ✅ Sends link with the <b>token</b> to allow user activate his account
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
      #swagger.responses[200] = {
         description: 'Activate account by clicking the link that has been sent to you',
      }  
      #swagger.responses[409] = {
         description: 'Email address already taken',
      }  
      #swagger.responses[502] = {
         description: 'There was a problem sending the activation link',
      }  
    */
   '/register',
   ...register
)

Auth.post(
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Check if user already activated his account <br />
         ✅ Toggles account as activated if it's not already <br />
      #swagger.parameters['activationToken'] = {
         in: 'body',
         description: 'Account activation token. Expires in 24h',
         required: 'true',
         schema: { $ref: '#/definitions/jwt' }
      } 
      #swagger.responses[200] = {
         description: 'Account activated, you can login now',
      }  
      #swagger.responses[409] = {
         description: 'No authentication associated with this link',
      }  
      #swagger.responses[403] = {
         description: 'Account already activated',
      }  
      #swagger.responses[401] = {
         description: 'The activation link has expired',
      }  
      #swagger.responses[400] = {
         description: 'The activation link is invalid',
      }  
    */
   '/activateAccount',
   ...activateAccount
)

Auth.post(
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Ensures user with provided email address exists  <br />
         ✅ Rejects resending activation token if account is already activated <br />
         ✅ Sends new activation token to the user <br />
      #swagger.parameters['email'] = {
         in: 'body',
         description: 'User email',
         required: 'true',
         schema: { $ref: '#/definitions/email' }
      } 
      #swagger.responses[200] = {
         description: 'Link with new activation token has been sent',
      }  
      #swagger.responses[404] = {
         description: 'Provided email address is invalid',
      }  
      #swagger.responses[403] = {
         description: 'Account already activated',
      }  
      #swagger.responses[401] = {
         description: 'The activation link has expired',
      }  
      #swagger.responses[400] = {
         description: 'The activation link is invalid',
      }  
      #swagger.responses[502] = {
         description: 'There was a problem sending the activation link',
      }  
    */
   '/resendActivationToken',
   ...resendActivationToken
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
