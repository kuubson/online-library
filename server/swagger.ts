import swaggerAutogen from 'swagger-autogen'

import { version } from './package.json'

const doc = {
   info: {
      version,
      title: 'Online Library',
      description: 'API for Online Library',
   },
}

swaggerAutogen()('../client/src/shared/swagger.json', ['./server.ts'], doc)
