import type { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

import { swagger } from 'online-library'

export const serveApiDocs = async (app: Application) => {
   app.use('/api-docs', serve, setup(swagger, { swaggerOptions: { persistAuthorization: true } }))
}
