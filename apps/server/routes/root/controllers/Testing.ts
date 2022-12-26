import { Router } from 'express'

import { seedUser } from '../services/testing'

export const Testing = Router()

Testing.get(
   /**
      #swagger.summary = "Seeding a user"
      #swagger.description = `
         ✔️ Seeds a test user
      `
      #swagger.responses[200] = { description: 'User seeded' }  
*/
   '/seed-user',
   ...seedUser
)
