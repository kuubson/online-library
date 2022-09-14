import { Router } from 'express'

import { checkAuth, logout } from '../services'

export const Root = Router()

Root.get(
   /**
      #swagger.summary = "Auth check"
      #swagger.description = `
         ✅ Checks existance of <b>auth token</b> in cookies and validates it <br />
         ✅ Returns proper role to the end user <br />
      `
      #swagger.responses[200] = { 
         description: 'Returns current role',   
         schema: { $ref: '#/definitions/schema@role' },   
      }  
*/
   '/auth-check',
   ...checkAuth
)

Root.get(
   /**
      #swagger.summary = "Logout"
      #swagger.description = `
         ✅ Logs user out <br />
         ✅ Removes auth token from cookies <br />
      `
      #swagger.responses[200] = { 
         description: 'Returns current role',   
         schema: { $ref: '#/definitions/schema@role' },   
      }  
*/
   '/logout',
   ...logout
)