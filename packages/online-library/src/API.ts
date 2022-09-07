import { mapValues } from 'lodash'

import type { Errors, Paths, PropertiesOfPathMethods } from '../types'

import swagger from './swagger.json'
import { yup } from './yup'

const errors = mapValues(swagger.paths, paths =>
   mapValues(paths, ({ responses }: PropertiesOfPathMethods) =>
      mapValues(responses, ({ description }: { description: string }) => description)
   )
) as Errors

const getPathInfo = <Path extends keyof Paths>(path: Path) => ({
   url: path,
   ...errors[path],
})

class _API {
   public activateAccount = {
      header: 'Email address authentication',
      ...getPathInfo('/api/user/auth/activateAccount'),
   }

   public login = {
      header: 'Authentication',
      ...getPathInfo('/api/user/auth/login'),
      validation: yup
         .object({
            email: yup.string().emailAddress(),
            password: yup.string().required(),
         })
         .noOtherKeys(),
   }

   public loginWithFacebook = {
      header: 'Authentication',
      ...getPathInfo('/api/user/auth/loginWithFacebook'),
      validation: yup
         .object({
            name: yup.string().noSpecialChars(),
            email: yup.string().emailAddress(),
            access_token: yup.string().plain(),
         })
         .noOtherKeys(),
   }

   public changePassword = {
      header: 'Changing the password',
      ...getPathInfo('/api/user/auth/changePassword'),
      validation: yup
         .object({
            password: yup.string().password(),
            repeatedPassword: yup.string().repeatedPassword(),
         })
         .noOtherKeys(),
   }

   public checkPasswordToken = {
      header: 'Recovering the password',
      ...getPathInfo('/api/user/auth/checkPasswordToken'),
   }

   public register = {
      header: 'Account registration',
      ...getPathInfo('/api/user/auth/register'),
      validation: yup
         .object({
            name: yup.string().noSpecialChars(),
            email: yup.string().emailAddress(),
            password: yup.string().password(),
            repeatedPassword: yup.string().repeatedPassword(),
         })
         .noOtherKeys(),
   }

   public recoverPassword = {
      header: 'Recovering the password',
      ...getPathInfo('/api/user/auth/recoverPassword'),
      validation: yup.object({ email: yup.string().emailAddress() }).noOtherKeys(),
   }

   public resendActivationToken = {
      header: 'Activation token',
      ...getPathInfo('/api/user/auth/resendActivationToken'),
      validation: yup.object({ email: yup.string().emailAddress() }).noOtherKeys(),
   }

   public getMessagesInfo = { ...getPathInfo('/api/user/chat/getMessagesInfo') }

   public getMessages = {
      ...getPathInfo('/api/user/chat/getMessages'),
      validation: yup
         .object({
            limit: yup.number().required(),
            offset: yup.number().required(),
         })
         .noOtherKeys(),
   }

   public subscribePushNotifications = {
      ...getPathInfo('/api/user/chat/subscribePushNotifications'),
      validation: yup
         .object({
            endpoint: yup.string().plain(),
            keys: yup.object({
               auth: yup.string().plain(),
               p256dh: yup.string().plain(),
            }),
         })
         .noOtherKeys(),
   }

   public sendMessage = {
      ...getPathInfo('/api/user/chat/sendMessage'),
      validation: yup.object({ content: yup.string().plain() }).noOtherKeys(),
   }

   public sendFile = {
      header: 'Sending a file',
      ...getPathInfo('/api/user/chat/sendFile'),
   }

   public executePayPalPayment = {
      header: 'Submitting the order',
      ...getPathInfo('/api/user/cart/executePayPalPayment'),
      validation: yup
         .object({
            paymentId: yup.string().plain(),
            PayerID: yup.string().plain(),
         })
         .noOtherKeys(),
   }

   public createPayPalPayment = {
      header: 'Submitting the order',
      ...getPathInfo('/api/user/cart/createPayPalPayment'),
      validation: yup.object({ products: yup.array().products() }).noOtherKeys(),
   }

   public purchaseBooksWithStripe = {
      header: 'Submitting the order',
      ...getPathInfo('/api/user/cart/purchaseBooksWithStripe'),
      validation: yup
         .object({
            paymentId: yup.string().plain(),
            products: yup.array().products(),
         })
         .noOtherKeys(),
   }

   public getSuggestions = {
      ...getPathInfo('/api/user/books/getSuggestions'),
      validation: yup
         .object({
            title: yup.string().noSpecialChars(),
            author: yup.string().noSpecialChars(),
            withProfile: yup.bool().required(),
         })
         .noOtherKeys(),
   }

   public checkToken = { ...getPathInfo('/api/user/global/checkToken') }

   public logout = { ...getPathInfo('/api/user/global/logout') }
}

export const API = new _API()
