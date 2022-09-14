import { Router } from 'express'

import { Root } from './Root'

export const RootController = Router()

RootController.use(
   /*
   #swagger.tags = ['Root']
   #swagger.responses[422] = { $ref: "#/definitions/422@data-validation" }
*/
   '/api',
   Root
)
