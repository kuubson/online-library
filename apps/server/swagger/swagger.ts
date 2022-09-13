import path from 'path'
import swaggerAutogen from 'swagger-autogen'

import type { SwaggerAutogenPromise } from './types'

import { version } from '../package.json'
import {
   access_token,
   author,
   content,
   email,
   endpoint,
   expirationTime,
   file,
   integer,
   jwt,
   keys,
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
import { errors } from './errors'

const doc = {
   info: {
      version,
      title: 'Online Library',
      description: 'API for Online Library',
   },
   host: 'localhost:3001',
   components: { '@schemas': { ...schemas } },
   '@definitions': {
      ...errors,
      register: {
         type: 'object',
         properties: {
            name,
            email,
            password,
            repeatedPassword: password,
         },
      },
      'patch-account': {
         type: 'object',
         properties: { activationToken: jwt },
      },
      'post-activation-token': {
         type: 'object',
         properties: { email },
      },
      'post-login-credentials': {
         type: 'object',
         properties: {
            email,
            password,
         },
      },
      'post-login-fb': {
         type: 'object',
         properties: {
            name,
            email,
            access_token,
         },
      },
      'post-password': {
         type: 'object',
         properties: { email },
      },
      'patch-password': {
         type: 'object',
         properties: {
            password,
            passwordToken: jwt,
         },
      },
      'post-stripe-payment': {
         type: 'object',
         properties: {
            paymentId: stripePaymentId,
            products,
         },
      },
      'post-paypal-checkout': {
         type: 'object',
         properties: { products },
      },
      'post-paypal-payment': {
         type: 'object',
         properties: {
            paymentId: paypalPaymentId,
            PayerID: paypalPayerId,
         },
      },
      'post-notifications': {
         type: 'object',
         properties: {
            endpoint,
            expirationTime,
            keys,
         },
      },
      'get-books': {
         type: 'object',
         properties: {
            title,
            author,
            withProfile,
         },
      },
      'get-messages': {
         type: 'object',
         properties: {
            limit: integer(20),
            offset: integer(0),
         },
      },
      'post-messages': {
         type: 'object',
         properties: { content },
      },
      'post-files': {
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
