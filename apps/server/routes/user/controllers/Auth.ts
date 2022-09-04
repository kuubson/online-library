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
         ✅ Checks if user already exist <br />
         ✅ Generates an <b>activation token</b> <br />
         ✅ Sends link with the <b>token</b> to allow user activate his account <br />
      `
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
         ✅ Toggles account as activated if it's not alread <br />
      `
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
    */
   '/activateAccount',
   ...activateAccount
)

Auth.post(
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Ensures user with provided email address exists <br />
         ✅ Rejects resending activation token if account is already activate <br />
         ✅ Sends new activation token to the use <br />
      `
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
      #swagger.responses[502] = {
         description: 'There was a problem sending the activation link',
      }  
    */
   '/resendActivationToken',
   ...resendActivationToken
)

Auth.post(
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Checks given email and password <br />
         ✅ Check if account is activated <br />
         ✅ Sends authentication if credentials are ok <br />
      `
      #swagger.parameters['email'] = {
         in: 'body',
         description: 'User email',
         required: 'true',
         schema: { $ref: '#/definitions/email' }
      } 
      #swagger.parameters['password'] = {
         in: 'body',
         description: 'User password',
         required: 'true',
         schema: { $ref: '#/definitions/password' }
      } 
      #swagger.responses[401] = {
         description: 'The given credentials are wrong',
      }  
      #swagger.responses[403] = {
         description: 'Account not activated',
      }  
    */
   '/login',
   ...login
)

Auth.post(
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Verifies <b>access token</b> provided by facebook auth <br />
         ✅ Sends <b>auth token</b> for either already existing user or newly created one <br />
      `
      #swagger.parameters['name'] = {
         in: 'body',
         description: 'User name provided by FB',
         required: 'true',
         schema: { $ref: '#/definitions/name' }
      } 
      #swagger.parameters['email'] = {
         in: 'body',
         description: 'User email provided by FB',
         required: 'true',
         schema: { $ref: '#/definitions/email' }
      } 
      #swagger.parameters['access_token'] = {
         in: 'body',
         description: 'Access token provided by FB',
         required: 'true',
         schema: { $ref: '#/definitions/access_token' }
      } 
      #swagger.responses[400] = {
         description: 'There was an unexpected problem with FB authentication',
      }  
    */
   '/loginWithFacebook',
   facebookAuthorization,
   ...loginWithFacebook
)

Auth.post(
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Checks if any user belongs to provided email address <br />
         ✅ Makes sure that user account is activated <br />
         ✅ Generates <b>password token</b> to authorize changing password in the next step (password form) <br />
      `
      #swagger.parameters['email'] = {
         in: 'body',
         description: 'User email',
         required: 'true',
         schema: { $ref: '#/definitions/email' }
      } 
      #swagger.responses[200] = {
         description: 'Link to reset the password has been sent',
      }  
      #swagger.responses[404] = {
         description: 'An incorrect email address was provided',
      }  
      #swagger.responses[409] = {
         description: 'Account must be firstly activated',
      } 
      #swagger.responses[502] = {
         description: 'There was a problem sending the link allowing resetting password',
      }  
    */
   '/recoverPassword',
   ...recoverPassword
)

Auth.post(
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Checks password token generated by <b>/api/user/auth/recoverPassword</b> <br />
         ✅ Checks if there is a user with email address as kept in password token <br />
      `
      #swagger.parameters['passwordToken'] = {
         in: 'body',
         description: 'Password token',
         required: 'true',
         schema: { $ref: '#/definitions/jwt' }
      } 
      #swagger.responses[400] = {
         description: 'Link to reset the password is invalid',
      }  
    */
   '/checkPasswordToken',
   ...checkPasswordToken
)

Auth.post(
   /*
   `  #swagger.tags = ['Auth']
      #swagger.description = `
         ✅ Changes user password <br />
      `
      #swagger.parameters['password'] = {
         in: 'body',
         description: 'New user password',
         required: 'true',
         schema: { $ref: '#/definitions/password' }
      } 
      #swagger.parameters['passwordToken'] = {
         in: 'body',
         description: 'Password token',
         required: 'true',
         schema: { $ref: '#/definitions/jwt' }
      } 
      #swagger.responses[200] = {
         description: 'Password has been changed',
      }
      #swagger.responses[400] = {
         description: 'Link to reset the password is invalid',
      }
    */
   '/changePassword',
   ...changePassword
)
