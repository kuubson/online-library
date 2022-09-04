import swagger from './swagger.json'
import { yup } from './yup'

type Swagger = typeof swagger.paths

type Errors = {
   [Method in keyof Swagger]: {
      [Property in keyof Swagger[Method]]: Swagger[Method][Property] extends { responses: object }
         ? Record<keyof Swagger[Method][Property]['responses'], string>
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

const getPathInfo = <Path extends keyof Swagger>(path: Path) => ({
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
      validation: yup.object({
         email: yup.string().emailAddress(),
         password: yup.string().uncheckedPassword(),
      }),
   }

   public loginWithFacebook = {
      header: 'Authentication',
      ...getPathInfo('/api/user/auth/loginWithFacebook'),
      validation: yup.object({
         name: yup.string().sanitized(),
         email: yup.string().emailAddress(),
         access_token: yup.string().sanitized(),
      }),
   }

   public changePassword = {
      header: 'Changing the password',
      ...getPathInfo('/api/user/auth/changePassword'),
      validation: yup.object({
         password: yup.string().password(),
         repeatedPassword: yup.string().repeatedPassword(),
      }),
   }

   public checkPasswordToken = {
      header: 'Recovering the password',
      ...getPathInfo('/api/user/auth/checkPasswordToken'),
   }

   public register = {
      header: 'Account registration',
      ...getPathInfo('/api/user/auth/register'),
      validation: yup.object({
         name: yup.string().sanitized(),
         email: yup.string().emailAddress(),
         password: yup.string().password(),
         repeatedPassword: yup.string().repeatedPassword(),
      }),
   }

   public recoverPassword = {
      header: 'Recovering the password',
      ...getPathInfo('/api/user/auth/recoverPassword'),
      validation: yup.object({ email: yup.string().emailAddress() }),
   }

   public resendActivationToken = {
      header: 'Activation token',
      ...getPathInfo('/api/user/auth/resendActivationToken'),
      validation: yup.object({ email: yup.string().emailAddress() }),
   }

   public getMessagesInfo = {
      header: '',
      ...getPathInfo('/api/user/chat/getMessagesInfo'),
   }

   public getMessages = {
      header: '',
      ...getPathInfo('/api/user/chat/getMessages'),
      validation: yup.object({
         limit: yup.number().required(),
         offset: yup.number().required(),
      }),
   }

   public subscribePushNotifications = {
      header: '',
      ...getPathInfo('/api/user/chat/subscribePushNotifications'),
      validation: yup.object({
         endpoint: yup.string().sanitized(),
         keys: yup.object({
            auth: yup.string().sanitized(),
            p256dh: yup.string().sanitized(),
         }),
      }),
   }

   public sendMessage = {
      header: '',
      ...getPathInfo('/api/user/chat/sendMessage'),
      validation: yup.object({ content: yup.string().sanitized() }),
   }

   public sendFile = {
      header: 'Sending a file',
      ...getPathInfo('/api/user/chat/sendFile'),
   }

   public executePayPalPayment = {
      header: 'Submitting the order',
      ...getPathInfo('/api/user/cart/executePayPalPayment'),
      validation: yup.object({
         paymentId: yup.string().sanitized(),
         PayerID: yup.string().sanitized(),
      }),
   }

   public createPayPalPayment = {
      header: 'Submitting the order',
      ...getPathInfo('/api/user/cart/createPayPalPayment'),
      validation: yup.object({ products: yup.array().products() }),
   }

   public purchaseBooksWithStripe = {
      header: 'Submitting the order',
      ...getPathInfo('/api/user/cart/purchaseBooksWithStripe'),
      validation: yup.object({
         paymentId: yup.string().sanitized(),
         products: yup.array().products(),
      }),
   }

   public getSuggestions = {
      header: '',
      ...getPathInfo('/api/user/books/getSuggestions'),
      validation: yup.object({
         title: yup.string().sanitized('optional'),
         author: yup.string().sanitized('optional'),
         withProfile: yup.bool().required(),
      }),
   }

   public checkToken = {
      header: '',
      ...getPathInfo('/api/user/global/checkToken'),
   }

   public logout = {
      header: '',
      ...getPathInfo('/api/user/global/logout'),
   }
}

export const API = new _API()
