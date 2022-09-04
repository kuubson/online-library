import { Router } from 'express'

import { checkToken, logout } from '../services/global'

export const Global = Router()

Global.get(
   /*
   `  #swagger.tags = ['Global']
      #swagger.description = `
         ✅ Checks existance of <b>auth token</b> in cookies and validates it <br />
         ✅ Returns proper role to the end user <br />
      `
      #swagger.parameters['token'] = {
         in: 'cookies',
         description: 'Auth token. Expires in 24h',
         required: 'false',
         schema: { $ref: '#/definitions/jwt' }
      } 
    */
   '/checkToken',
   ...checkToken
)

Global.get(
   /*
   `  #swagger.tags = ['Global']
      #swagger.description = `
         ✅ Logs user out <br />
         ✅ Removes auth token from cookies <br />
      `
      #swagger.parameters['token'] = {
         in: 'cookies',
         description: 'Auth token. Expires in 24h',
         required: 'false',
         schema: { $ref: '#/definitions/jwt' }
      } 
    */
   '/logout',
   ...logout
)
