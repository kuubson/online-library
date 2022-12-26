import { Router } from 'express'

import { isProd } from '@online-library/config'

import { Global } from './Global'
import { Testing } from './Testing'

export const RootController = Router()

RootController.use(
   /*
   #swagger.tags = ['Global']
   #swagger.responses[422] = { $ref: "#/definitions/422@data-validation" }
*/
   '/api',
   Global
)

if (!isProd) {
   RootController.use(
      /*
   #swagger.tags = ['Testing']
   #swagger.responses[422] = { $ref: "#/definitions/422@data-validation" }
*/
      '/api/testing',
      Testing
   )
}
