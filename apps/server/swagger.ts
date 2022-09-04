import path from 'path'
import swaggerAutogen from 'swagger-autogen'

import { version } from './package.json'

const doc = {
   info: {
      version,
      title: 'Online Library',
      description: 'API for Online Library',
   },
   host: 'localhost:3001',
   definitions: {
      name: 'John',
      email: 'john@example.com',
      password: 'Sp2mc$10#F',
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      access_token: 'EAAG6VehVAPMBAK30w7QenD65zUARr9d4P3yQf44X5anasd6QnjtEtXH2c7TG234fsBMchb4Pe',
      boolean: 'true',
      plain: 'plain text',
      stripePaymentId: 'pm_1LeJuTCA0Hw88eOYpY9kEDWK',
      paypalPaymentId: 'PAYID-MMKLWRQ82689537V0194325L',
      paypalPayerID: 'KVYVDZAMZGRRA',
      products: '[1,5,9,11]',
   },
   securityDefinitions: {
      token: {
         in: 'cookie',
         name: 'token',
         type: 'apiKey',
         description:
            'Auth token (jwt) generated with /login or /loginWithFacebook. Expires in 24h',
      },
   },
}

const outputPath = path.join('../../packages/online-library/src/swagger.json')

swaggerAutogen()(outputPath, ['./server.ts'], doc)
