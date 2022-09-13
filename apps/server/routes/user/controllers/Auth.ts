import { Router } from 'express'

import { facebookAuthorization } from 'middlewares'

import {
   activateAccount,
   changePassword,
   loginWithCredentials,
   loginWithFb,
   register,
   requestPasswordChange,
   resendActivationToken,
} from '../services/auth'

export const Auth = Router()

Auth.post(
   /**
      #swagger.summary = "Account registration"
      #swagger.description = `
         ✅ Checks if user already exist <br />
         ✅ Generates an <b>activation token</b> <br />
         ✅ Sends link with the <b>token</b> to allow user activate his account <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@register" }
      }      
      #swagger.responses[200] = { description: 'Activate account by clicking the link that has been sent to you' }  
      #swagger.responses[409] = { description: 'Email address already taken' }  
      #swagger.responses[502] = { $ref: "#/definitions/502@activation-link" }  
*/
   '/register',
   ...register
)

Auth.patch(
   /**
      #swagger.summary = "Account activation"
      #swagger.description = `
         ✅ Check if user already activated his account <br />
         ✅ Toggles account as activated if it's not alread <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/patch@account" }
      }  
      #swagger.responses[200] = { description: 'Account activated, you can login now' }  
      #swagger.responses[409] = { description: 'No authentication associated with this link' }  
      #swagger.responses[403] = { $ref: "#/definitions/503@account-activated" }  
*/
   '/account',
   ...activateAccount
)

Auth.post(
   /**
      #swagger.summary = "Account activation token"
      #swagger.description = `
         ✅ Ensures user with provided email address exists <br />
         ✅ Rejects resending activation token if account is already activate <br />
         ✅ Sends new activation token to the use <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@activation-token" }
      }  
      #swagger.responses[200] = { description: 'Link with new activation token has been sent' }  
      #swagger.responses[404] = { $ref: "#/definitions/404@incorrect-email-address" }  
      #swagger.responses[403] = { $ref: "#/definitions/503@account-activated" }  
      #swagger.responses[502] = { $ref: "$/definitions/502@activation-link" }  
*/
   '/activation-token',
   ...resendActivationToken
)

Auth.post(
   /**
      #swagger.summary = "Authentication"
      #swagger.description = `
         ✅ Checks given email and password <br />
         ✅ Check if account is activated <br />
         ✅ Sends auth token, that expires in 24h, if credentials are ok<br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@login-credentials" }
      }  
      #swagger.responses[200] = { $ref: "#/definitions/200@auth-token" }  
      #swagger.responses[401] = { description: 'The given credentials are wrong' }  
      #swagger.responses[403] = { description: 'Account not activated' }  
*/
   '/login/credentials',
   ...loginWithCredentials
)

Auth.post(
   /**
      #swagger.summary = "Authentication"
      #swagger.description = `
         ✅ Verifies <b>access token</b> provided by FB auth <br />
         ✅ Sends <b>auth token</b>, that expires in 24h, for either already existing user or newly created one <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@login-fb" }
      }  
      #swagger.responses[200] = { $ref: "#/definitions/200@auth-token" }  
      #swagger.responses[400] = { description: 'FB authentication has failed' }  
*/
   '/login/fb',
   facebookAuthorization,
   ...loginWithFb
)

Auth.route('/password')
   .post(
      /**
      #swagger.summary = "Password reset request"
      #swagger.description = `
         ✅ Checks if any user belongs to provided email address <br />
         ✅ Makes sure that user account is activated <br />
         ✅ Generates <b>password token</b> to authorize changing password in the next step (password form) <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@password" }
      }  
      #swagger.responses[200] = { description: 'Link to reset the password has been sent' }  
      #swagger.responses[404] = { $ref: "#/definitions/404@incorrect-email-address" }  
      #swagger.responses[409] = { description: 'Account must be firstly activated' } 
      #swagger.responses[502] = { description: 'There was a problem sending the link to reset password' }  
*/
      ...requestPasswordChange
   )
   .patch(
      /**
      #swagger.summary = "Password change"
      #swagger.description = `
         ✅ Changes user password <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/patch@password" }
      } 
      #swagger.responses[200] = { description: 'Password has been changed' }
      #swagger.responses[400] = { description: 'Link to reset the password is invalid' }
*/
      ...changePassword
   )
