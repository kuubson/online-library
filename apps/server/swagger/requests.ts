import { MESSAGES_FETCH_LIMIT } from '@online-library/config'

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
   stripePaymentId,
   title,
   withProfile,
} from './definitions'

export const requests = {
   'post@register': {
      type: 'object',
      properties: {
         name,
         email,
         password,
         repeatedPassword: password,
      },
   },
   'patch@account': {
      type: 'object',
      properties: { activationToken: jwt },
   },
   'post@activation-token': {
      type: 'object',
      properties: { email },
   },
   'post@login-credentials': {
      type: 'object',
      properties: {
         email,
         password,
      },
   },
   'post@login-fb': {
      type: 'object',
      properties: {
         name,
         email,
         access_token,
      },
   },
   'post@password': {
      type: 'object',
      properties: { email },
   },
   'patch@password': {
      type: 'object',
      properties: {
         password,
         passwordToken: jwt,
      },
   },
   'post@stripe-payment': {
      type: 'object',
      properties: {
         paymentId: stripePaymentId,
         products,
      },
   },
   'post@paypal-checkout': {
      type: 'object',
      properties: { products },
   },
   'post@paypal-payment': {
      type: 'object',
      properties: {
         paymentId: paypalPaymentId,
         PayerID: paypalPayerId,
      },
   },
   'post@notifications': {
      type: 'object',
      properties: {
         endpoint,
         expirationTime,
         keys,
      },
   },
   'get@books': {
      type: 'object',
      properties: {
         title,
         author,
         withProfile,
      },
   },
   'get@messages': {
      type: 'object',
      properties: {
         limit: integer(MESSAGES_FETCH_LIMIT),
         offset: integer(0),
      },
   },
   'post@messages': {
      type: 'object',
      properties: { content },
   },
   'post@files': {
      'multipart/form-data': {
         schema: {
            type: 'object',
            properties: { file },
         },
      },
   },
}
