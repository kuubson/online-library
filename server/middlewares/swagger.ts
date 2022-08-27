import type { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

import swagger from '../swagger.json'

export const initializeSwagger = async (app: Application) => {
   app.use('/api-docs', serve, setup(swagger))
}
