import { Router } from 'express'

import { rateLimiter } from 'middlewares'

import { checkAuth, getMobileApp, logout } from '../services'

export const Root = Router()

Root.get(
   /**
      #swagger.summary = "Auth check"
      #swagger.description = `
         ✔️ Checks existance of <b>auth token</b> in cookies and validates it <br />
         ✔️ Returns proper role to the end user <br />
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
         ✔️ Logs user out <br />
         ✔️ Removes auth token from cookies <br />
      `
      #swagger.responses[200] = { 
         description: 'Returns current role',   
         schema: { $ref: '#/definitions/schema@role' },   
      }  
*/
   '/logout',
   ...logout
)

Root.get(
   /**
      #swagger.summary = "Mobile app links (rate limited)"
      #swagger.description = `
         ✔️ Returns the links to download APK & soon IPA <br />
      `
      #swagger.responses[200] = { 
         description: 'Links to APK & soon IPA',   
         schema: { $ref: '#/definitions/schema@mobile-app' },   
      }  
*/
   '/mobile-app',
   rateLimiter(),
   ...getMobileApp
)
