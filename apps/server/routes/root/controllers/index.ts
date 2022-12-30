import { Router } from 'express'

import { isProd } from '@online-library/config'

import { Global } from './Global'
import { Testing } from './Testing'

export const RootController = Router()

RootController.use(
   /*
   #swagger.tags = ['Root']
   #swagger.responses[422] = { description: 'Data validation failed' }
*/
   '/api',
   Global
)

if (!isProd) {
   RootController.use(
      /*
   #swagger.tags = ['Testing']
   #swagger.responses[422] = { description: 'Data validation failed' }
*/
      '/api/testing',
      Testing
   )
}
