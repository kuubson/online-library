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
      access_token: 'EAAG6VehVAPMBAK30w7QenD65zUARr9d4P3yQf44X5anasd6QnjtEtXH2c7TG234fsBMchb4Pe',
   },
}

const outputPath = '../../packages/online-library/src/swagger.json'

swaggerAutogen()(outputPath, ['./server.ts'], doc)