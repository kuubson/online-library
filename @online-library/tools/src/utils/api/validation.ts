import { mapValues } from 'lodash'
import type { OptionalObjectSchema } from 'yup/lib/object'

import { default as swagger } from '../../../../../apps/server/swagger/swagger.json'
import { yup } from '../yup'

export type SWAGGER_PATHS = typeof swagger.paths

export type api = typeof API_PATHS

export const addValidation = <
   Path extends keyof SWAGGER_PATHS,
   Validation extends Partial<Record<keyof SWAGGER_PATHS[Path], OptionalObjectSchema<any>>>
>(
   path: Path,
   payload: Validation
) => {
   const methods = mapValues(payload, (validation, method: keyof SWAGGER_PATHS[Path]) => ({
      ...swagger.paths[path][method],
      validation,
   }))
   return { [path]: methods } as {
      [key in Path]: {
         [method in keyof SWAGGER_PATHS[Path]]: SWAGGER_PATHS[Path][method] & {
            validation: Validation[method]
         }
      }
   }
}

export const API_PATHS = {
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
   ...addValidation('/api/user/auth/password', {
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
