/* eslint-disable @typescript-eslint/no-unused-vars */
import { mapValues } from 'lodash'
import type { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

import type { Method } from '../types'

import { default as swagger } from '../../../apps/server/swagger/swagger.json'
import { yup } from './yup'

const addValidation = <
   Path extends typeof swagger.paths[keyof typeof swagger.paths],
   Validation extends ObjectShape
>(
   path: Path,
   validation: OptionalObjectSchema<Validation>,
   method: keyof Path
) =>
   ({
      [method]: {
         ...path[method],
         validation,
      },
   } as unknown as {
      [key in keyof Path]: Path[key] & {
         validation: OptionalObjectSchema<Validation>
      }
   })

const API_PATHS = {
   ...swagger.paths,
   '/api/user/auth/login': {
      post: {
         ...swagger.paths['/api/user/auth/login'].post,
         validation: yup
            .object({
               email: yup.string().emailAddress(),
               password: yup.string().required(),
            })
            .noOtherKeys(),
      },
   },
   '/api/user/auth/login/fb': {
      post: {
         ...swagger.paths['/api/user/auth/login/fb'].post,
         validation: yup
            .object({
               name: yup.string().noSpecialChars(),
               email: yup.string().emailAddress(),
               access_token: yup.string().plain(),
            })
            .noOtherKeys(),
      },
   },
   '/api/user/auth/password-change': {
      put: {
         ...swagger.paths['/api/user/auth/password-change'].put,
         validation: yup
            .object({
               password: yup.string().password(),
               repeatedPassword: yup.string().repeatedPassword(),
            })
            .noOtherKeys(),
      },
   },
   '/api/user/auth/register': {
      post: {
         ...swagger.paths['/api/user/auth/register'].post,
         validation: yup
            .object({
               name: yup.string().noSpecialChars(),
               email: yup.string().emailAddress(),
               password: yup.string().password(),
               repeatedPassword: yup.string().repeatedPassword(),
            })
            .noOtherKeys(),
      },
   },
   '/api/user/auth/password-recovery': {
      post: {
         ...swagger.paths['/api/user/auth/password-recovery'].post,
         validation: yup.object({ email: yup.string().emailAddress() }).noOtherKeys(),
      },
   },
   '/api/user/auth/activation-token-resend': {
      post: {
         ...swagger.paths['/api/user/auth/activation-token-resend'].post,
         validation: yup.object({ email: yup.string().emailAddress() }).noOtherKeys(),
      },
   },
   '/api/user/chat/messages': {
      post: {
         ...swagger.paths['/api/user/chat/messages'].post,
         validation: yup
            .object({
               limit: yup.number().required(),
               offset: yup.number().required(),
            })
            .noOtherKeys(),
      },
   },
   '/api/user/chat/push-notifications': {
      post: {
         ...swagger.paths['/api/user/chat/push-notifications'].post,
         validation: yup
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
   },
   '/api/user/chat/message': {
      post: {
         ...swagger.paths['/api/user/chat/message'].post,
         validation: yup.object({ content: yup.string().plain() }).noOtherKeys(),
      },
   },
   '/api/user/cart/paypal/payment': {
      post: {
         ...swagger.paths['/api/user/cart/paypal/payment'].post,
         validation: yup
            .object({
               paymentId: yup.string().plain(),
               PayerID: yup.string().plain(),
            })
            .noOtherKeys(),
      },
   },
   '/api/user/cart/paypal/checkout': {
      post: {
         ...swagger.paths['/api/user/cart/paypal/checkout'].post,
         validation: yup.object({ products: yup.array().products() }).noOtherKeys(),
      },
   },
   '/api/user/cart/stripe/payment': {
      post: {
         ...swagger.paths['/api/user/cart/stripe/payment'].post,
         validation: yup
            .object({
               paymentId: yup.string().plain(),
               products: yup.array().products(),
            })
            .noOtherKeys(),
      },
   },
   '/api/user/books/suggestions': {
      ...addValidation(
         swagger.paths['/api/user/books/suggestions'],
         yup
            .object({
               title: yup.string().noSpecialChars(),
               author: yup.string().noSpecialChars(),
               withProfile: yup.bool().required(),
            })
            .noOtherKeys(),
         'post'
      ),
   },
}

type API = typeof API_PATHS

export const API = mapValues(API_PATHS, (methods, path) => ({
   ...mapValues(methods, ({ responses, summary, validation }, method) => ({
      method,
      url: path,
      validation,
      header: summary,
      errors: mapValues(responses, ({ description }: { description: string }) => description),
   })),
})) as {
   [path in keyof API]: {
      [method in keyof API[path]]: API[path][method] extends {
         responses: object
         validation: object
      }
         ? Method<method, keyof API[path][method]['responses'], API[path][method]['validation']>
         : API[path][method] extends {
              responses: object
           }
         ? Method<method, keyof API[path][method]['responses'], null>
         : API[path][method]
   }
}

/**
 * API type guard = makes sure that keys of "paths" match keys of "swagger.paths" ~~~> API.ts stays more refactorproof
 */

type SWAGGER = typeof swagger.paths

type API_PATHS_WITH_VALIDATION = {
   [path in keyof SWAGGER]: {
      [method in keyof SWAGGER[path]]: SWAGGER[path][method] & {
         validation: OptionalObjectSchema<any>
      }
   }
}

declare function _(api: API): api is {
   [key in keyof typeof swagger.paths]: API_PATHS_WITH_VALIDATION[key]
}
