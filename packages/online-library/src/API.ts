import swagger from './swagger.json'
import { yup } from './yup'

type Paths = typeof swagger.paths

type Errors = {
   [Method in keyof Paths]: {
      [Property in keyof Paths[Method]]: Paths[Method][Property] extends { responses: object }
         ? Record<keyof Paths[Method][Property]['responses'], string>
         : undefined
   }
}

const errors = Object.fromEntries(
   Object.entries(swagger.paths).map(([path, methods]) => {
      const errors = Object.fromEntries(
         Object.entries(methods).map(([method, { responses }]) => {
            const codes = Object.fromEntries(
               Object.entries(responses).map(([code, { description }]: any) => {
                  return [code, description]
               })
            )
            return [method, codes]
         })
      )
      return [path, errors]
   })
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
            password: yup.string().uncheckedPassword(),
         })
         .noOtherKeys(),
   }

   public loginWithFacebook = {
      header: 'Authentication',
      ...getPathInfo('/api/user/auth/loginWithFacebook'),
      validation: yup
         .object({
            name: yup.string().sanitized(),
            email: yup.string().emailAddress(),
            access_token: yup.string().sanitized(),
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
            name: yup.string().sanitized(),
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
            endpoint: yup.string().sanitized(),
            keys: yup.object({
               auth: yup.string().sanitized(),
               p256dh: yup.string().sanitized(),
            }),
         })
         .noOtherKeys(),
   }

   public sendMessage = {
      ...getPathInfo('/api/user/chat/sendMessage'),
      validation: yup.object({ content: yup.string().sanitized() }).noOtherKeys(),
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
            paymentId: yup.string().sanitized(),
            PayerID: yup.string().sanitized(),
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
            paymentId: yup.string().sanitized(),
            products: yup.array().products(),
         })
         .noOtherKeys(),
   }

   public getSuggestions = {
      ...getPathInfo('/api/user/books/getSuggestions'),
      validation: yup
         .object({})
         .shape(
            {
               title: yup.string().when('author', {
                  is: (author: string) => !!author,
                  then: yup.string().test(title => !title),
                  otherwise: yup.string().sanitized(),
               }),
               author: yup.string().when('title', {
                  is: (title: string) => !!title,
                  then: yup.string().test(author => !author),
                  otherwise: yup.string().sanitized(),
               }),
               withProfile: yup.bool().required(),
            },
            [
               ['title', 'author'],
               ['author', 'title'],
            ]
         )
         .noOtherKeys(),
   }

   public checkToken = { ...getPathInfo('/api/user/global/checkToken') }

   public logout = { ...getPathInfo('/api/user/global/logout') }
}

export const API = new _API()
