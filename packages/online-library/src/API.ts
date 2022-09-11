import { mapValues } from 'lodash'
import type { AnySchema } from 'yup'

import { default as swagger } from '../../../apps/server/swagger/swagger.json'
import { yup } from './yup'

type Docs = typeof swagger.paths

export const validations = {
   '/api/user/auth/login': {
      post: yup
         .object({
            email: yup.string().emailAddress(),
            password: yup.string().required(),
         })
         .noOtherKeys(),
   },
   '/api/user/auth/login/fb': {
      post: yup
         .object({
            name: yup.string().noSpecialChars(),
            email: yup.string().emailAddress(),
            access_token: yup.string().plain(),
         })
         .noOtherKeys(),
   },
   '/api/user/auth/password-change': {
      put: yup
         .object({
            password: yup.string().password(),
            repeatedPassword: yup.string().repeatedPassword(),
         })
         .noOtherKeys(),
   },
   '/api/user/auth/register': {
      post: yup
         .object({
            name: yup.string().noSpecialChars(),
            email: yup.string().emailAddress(),
            password: yup.string().password(),
            repeatedPassword: yup.string().repeatedPassword(),
         })
         .noOtherKeys(),
   },
   '/api/user/auth/password-recovery': {
      post: yup.object({ email: yup.string().emailAddress() }).noOtherKeys(),
   },
   '/api/user/auth/activation-token-resend': {
      post: yup.object({ email: yup.string().emailAddress() }).noOtherKeys(),
   },
   '/api/user/chat/getMessages': {
      post: yup
         .object({
            limit: yup.number().required(),
            offset: yup.number().required(),
         })
         .noOtherKeys(),
   },
   '/api/user/chat/subscribePushNotifications': {
      post: yup
         .object({
            endpoint: yup.string().plain(),
            expirationTime: yup.string().nullable(),
            keys: yup.object({
               auth: yup.string().plain(),
               p256dh: yup.string().plain(),
            }),
         })
         .noOtherKeys(),
   },
   '/api/user/chat/sendMessage': {
      post: yup.object({ content: yup.string().plain() }).noOtherKeys(),
   },
   '/api/user/cart/executePayPalPayment': {
      post: yup
         .object({
            paymentId: yup.string().plain(),
            PayerID: yup.string().plain(),
         })
         .noOtherKeys(),
   },
   '/api/user/cart/createPayPalPayment': {
      post: yup.object({ products: yup.array().products() }).noOtherKeys(),
   },
   '/api/user/cart/stripe/payment': {
      // TODO: find proper way of assigning validation to endpoint cuz this approach is 2risky when doing refactoring
      post: yup
         .object({
            paymentId: yup.string().plain(),
            products: yup.array().products(),
         })
         .noOtherKeys(),
   },
   '/api/user/books/suggestions': {
      post: yup
         .object({
            title: yup.string().noSpecialChars(),
            author: yup.string().noSpecialChars(),
            withProfile: yup.bool().required(),
         })
         .noOtherKeys(),
   },
}

type Paths = {
   [path in keyof Docs]: {
      [method in keyof Docs[path]]: Docs[path][method] extends {
         responses: object
      }
         ? {
              readonly _method: method
              url: string
              header: string
              errors: Record<keyof Docs[path][method]['responses'], string>
              validation: AnySchema
           }
         : undefined
   }
}

export const API = mapValues(swagger.paths, (methods, path) => ({
   ...mapValues(methods, ({ responses, summary }, method) => ({
      _method: method, // TODO: try to prepare axios request shape here (url & method)
      url: path,
      header: summary,
      errors: mapValues(responses, ({ description }: { description: string }) => description),
   })),
})) as unknown as Paths

// check out lodash.set for setting validation per path[method]
