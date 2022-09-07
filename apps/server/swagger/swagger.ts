import path from 'path'
import swaggerAutogen from 'swagger-autogen'

import { version } from '../package.json'
import {
   access_token,
   book,
   email,
   getSuggestions,
   jwt,
   name,
   password,
   paypalApprovalLink,
   paypalPayerId,
   paypalPaymentId,
   products,
   stripePaymentId,
} from './definitions'

const doc = {
   info: {
      version,
      title: 'Online Library',
      description: 'API for Online Library',
   },
   host: 'localhost:3001',
   definitions: {
      plain: 'plain text',
      paypalPaymentId: '',
      paypalPayerID: '',
   },
   components: {
      '@schemas': {
         book,
         paypalApprovalLink,
      },
   },
   '@definitions': {
      register: {
         type: 'object',
         properties: {
            name,
            email,
            password,
            repeatedPassword: password,
         },
      },
      activateAccount: {
         type: 'object',
         properties: { activationToken: jwt },
      },
      resendActivationToken: {
         type: 'object',
         properties: { email },
      },
      login: {
         type: 'object',
         properties: {
            email,
            password,
         },
      },
      loginWithFacebook: {
         type: 'object',
         properties: {
            name,
            email,
            access_token,
         },
      },
      recoverPassword: {
         type: 'object',
         properties: { email },
      },
      checkPasswordToken: {
         type: 'object',
         properties: { passwordToken: jwt },
      },
      changePassword: {
         type: 'object',
         properties: {
            password,
            passwordToken: jwt,
         },
      },
      purchaseBooksWithStripe: {
         type: 'object',
         properties: {
            paymentId: stripePaymentId,
            products,
         },
      },
      createPayPalPayment: {
         type: 'object',
         properties: { products },
      },
      executePayPalPayment: {
         type: 'object',
         properties: {
            paymentId: paypalPaymentId,
            PayerID: paypalPayerId,
         },
      },
      getSuggestionsByTitle: getSuggestions('title'),
      getSuggestionsByAuthor: getSuggestions('author'),
   },
   securityDefinitions: {
      token: {
         in: 'cookie',
         name: 'token',
         type: 'apiKey',
         description: 'Auth token (jwt) generated with /login or /loginWithFacebook',
      },
   },
}

const outputPath = path.resolve(__dirname, '../../../packages/online-library/src/swagger.json')

swaggerAutogen({ openapi: '3.0.0' })(outputPath, ['./server.ts'], doc).then(() => {
   console.log('📄 API docs has been created')
})
