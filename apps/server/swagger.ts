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
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
   },
}

const outputPath = '../../packages/online-library/swagger.json'

swaggerAutogen()(outputPath, ['./server.ts'], doc)
