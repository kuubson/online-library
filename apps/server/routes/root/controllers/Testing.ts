import { Router } from 'express'

import { deteleTestUser, getEtherealEmail, seedTestUser } from '../services/testing'

export const Testing = Router()

Testing.get(
   /**
      #swagger.summary = "Seeding a user"
      #swagger.description = `
         ✔️ Seeds a test user
      `
      #swagger.responses[200] = { description: 'User seeded' }  
*/
   '/test-user',
   ...seedTestUser
)

Testing.delete(
   /**
      #swagger.summary = "Deleting the test user"
      #swagger.description = `
         ✔️ Delets the test user
      `
      #swagger.responses[200] = { description: 'User deleted' }  
*/
   '/test-user',
   ...deteleTestUser
)

Testing.get(
   /**
      #swagger.summary = "Ethereal email"
      #swagger.description = `
         ✔️ Returns the latest ethereal email
      `
      #swagger.responses[200] = { 
         description: 'Returns url of ethereal email',   
         schema: { $ref: '#/definitions/schema@ethereal-email' },   
      }  
*/
   '/ethereal-email',
   ...getEtherealEmail
)
