import swaggerAutogen from 'swagger-autogen'

import { version } from './package.json'

const doc = {
   info: {
      version,
      title: 'Online Library',
      description: 'API for Online Library',
   },
   definitions: {
      name: 'John',
      email: 'john@example.com',
      password: 'Sp2mc$10#F',
   },
}

swaggerAutogen()('../client/src/shared/swagger.json', ['./server.ts'], doc)