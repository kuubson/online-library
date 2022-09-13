import path from 'path'
import swaggerAutogen from 'swagger-autogen'

import type { SwaggerAutogenPromise } from './types'

import { version } from '../package.json'
import {
   access_token,
   author,
   content,
   email,
   file,
   integer,
   jwt,
   name,
   password,
   paypalPayerId,
   paypalPaymentId,
   products,
   schemas,
   stripePaymentId,
   title,
   token,
   withProfile,
} from './definitions'

const doc = {
   info: {
      version,
      title: 'Online Library',
      description: 'API for Online Library',
   },
   host: 'localhost:3001',
   components: {
      '@schemas': {
         book: schemas.book,
         paypalApprovalLink: schemas.paypalApprovalLink,
         message: schemas.message,
         sendFileResponse: schemas.sendFileResponse,
         subscription: schemas.subscription,
         messagesInfo: schemas.messagesInfo,
         role: schemas.role,
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
      getSuggestions: {
         type: 'object',
         properties: {
            title,
            author,
            withProfile,
         },
      },
      getMessages: {
         type: 'object',
         properties: {
            limit: integer(20),
            offset: integer(0),
         },
      },
      sendMessage: {
         type: 'object',
         properties: { content },
      },
      sendFile: {
         'multipart/form-data': {
            schema: {
               type: 'object',
               properties: { file },
            },
         },
      },
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
