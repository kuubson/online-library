import type { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

import { swagger } from 'online-library'

export const initializeApiDocs = async (app: Application) => {
   app.use('/api-docs', serve, setup(swagger))
}
