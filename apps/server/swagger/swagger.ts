import path from 'path'
import swaggerAutogen from 'swagger-autogen'

import type { SwaggerAutogenPromise } from './types'

import { version } from '../package.json'
import { token } from './definitions'
import { requests } from './requests'
import { responses } from './responses'
import { schemas } from './schemas'

const doc = {
   info: {
      version,
      title: 'Online Library',
      description: 'API for Online Library',
   },
   host: 'localhost:3001',
   components: { '@schemas': { ...schemas } },
   '@definitions': {
      ...requests,
      ...responses,
   },
   securityDefinitions: { token },
}

swaggerAutogen({ openapi: '3.0.0' })(
   path.join(__dirname, 'swagger.json'),
   ['./server.ts'],
   doc
).then(({ success }: SwaggerAutogenPromise) => {
   if (success) {
      console.log('📄✅ API docs has been generated')
   } else {
      console.log('📄❌ Generating API docs has failed')
   }
})
