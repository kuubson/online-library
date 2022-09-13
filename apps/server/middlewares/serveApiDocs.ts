import type { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

import { swaggerJson } from 'swagger'

export const serveApiDocs = async (app: Application) => {
   app.use(
      '/api-docs',
      serve,
      setup(swaggerJson, {
         explorer: true,
         swaggerOptions: { persistAuthorization: true },
      })
   )
}
