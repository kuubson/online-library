/* eslint-disable @typescript-eslint/no-unused-vars */
import { mapValues } from 'lodash'
import type { OptionalObjectSchema } from 'yup/lib/object'

import type { Method } from '../types'

import { default as swagger } from '../../../apps/server/swagger/swagger.json'
import { yup } from './yup'

const addValidation = <
   Path extends keyof typeof swagger.paths,
   Validation extends Partial<Record<keyof typeof swagger.paths[Path], OptionalObjectSchema<any>>>
>(
   path: Path,
   payload: Validation
) => {
   const methods = mapValues(payload, (validation, method: keyof typeof swagger.paths[Path]) => ({
      ...swagger.paths[path][method],
      validation,
   }))
   return { [path]: methods } as {
      [key in Path]: {
         [method in keyof typeof swagger.paths[Path]]: typeof swagger.paths[Path][method] & {
            validation: Validation[method]
         }
      }
   }
}

const API_PATHS = {
   ...swagger.paths,
   ...addValidation('/api/user/auth/login/credentials', {
      post: yup
         .object({
            email: yup.string().emailAddress(),
            password: yup.string().required(),
         })
         .noOtherKeys(),
   }),
   ...addValidation('/api/user/auth/login/fb', {
      post: yup
         .object({
            name: yup.string().noSpecialChars(),
            email: yup.string().emailAddress(),
            access_token: yup.string().plain(),
         })
         .noOtherKeys(),
   }),
   ...addValidation('/api/user/auth/password-change', {
      patch: yup
         .object({
            password: yup.string().password(),
            repeatedPassword: yup.string().repeatedPassword(),
            passwordToken: yup.string().optional(),
         })
         .noOtherKeys(),
      post: yup.object({ email: yup.string().emailAddress() }).noOtherKeys(),
   }),
   ...addValidation('/api/user/auth/register', {
      post: yup
         .object({
            name: yup.string().noSpecialChars(),
            email: yup.string().emailAddress(),
            password: yup.string().password(),
            repeatedPassword: yup.string().repeatedPassword(),
         })
         .noOtherKeys(),
   }),
   ...addValidation('/api/user/auth/activation-token', {
      post: yup.object({ email: yup.string().emailAddress() }).noOtherKeys(),
   }),
   ...addValidation('/api/user/chat/messages', {
      get: yup
         .object({
            limit: yup.string().noSpecialChars(),
            offset: yup.string().noSpecialChars(),
         })
         .noOtherKeys(),
      post: yup.object({ content: yup.string().plain() }).noOtherKeys(),
   }),
   ...addValidation('/api/user/chat/notifications', {
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
   }),
   ...addValidation('/api/user/cart/paypal/payment', {
      post: yup
         .object({
            paymentId: yup.string().plain(),
            PayerID: yup.string().plain(),
         })
         .noOtherKeys(),
   }),
   ...addValidation('/api/user/cart/paypal/checkout', {
      post: yup.object({ products: yup.array().products() }).noOtherKeys(),
   }),
   ...addValidation('/api/user/cart/stripe/payment', {
      post: yup
         .object({
            paymentId: yup.string().plain(),
            products: yup.array().products(),
         })
         .noOtherKeys(),
   }),
   ...addValidation('/api/user/books', {
      get: yup
         .object({
            title: yup.string().noSpecialChars(),
            author: yup.string().noSpecialChars(),
            withProfile: yup.string().booleanAsString(),
         })
         .noOtherKeys(),
   }),
   ...addValidation('/api/user/auth/account', {
      patch: yup.object({ activationToken: yup.string().plain() }).noOtherKeys(),
   }),
}

type API = typeof API_PATHS

export const API = mapValues(API_PATHS, (methods, path) => ({
   ...mapValues(methods, ({ responses, validation, summary }, method) => ({
      request: {
         method,
         url: path,
      },
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

// if it is red, it means that keys that you put manually into API_PATHS are not matched with what backend API exposes

declare function _(api: API): api is {
   [key in keyof typeof swagger.paths]: API_PATHS_WITH_VALIDATION[key]
}
