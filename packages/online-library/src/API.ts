import swagger from './swagger.json'
import { yup } from './yup'

type Endpoint = keyof typeof swagger['paths']

const getEndpointInfo = <E extends Endpoint>(endpoint: E) => ({
   url: endpoint,
   ...swagger['paths'][endpoint],
})

class _API {
   public AUTH = {
      activateAccount: {
         ...getEndpointInfo('/api/user/auth/activateAccount'),
         header: 'Email address authentication',
      },
      login: {
         ...getEndpointInfo('/api/user/auth/login'),
         header: 'Authentication',
         schema: yup.object({
            email: yup.string().emailAddress(),
            password: yup.string().uncheckedPassword(),
         }),
      },
      loginWithFacebook: {
         ...getEndpointInfo('/api/user/auth/loginWithFacebook'),
         header: 'Authentication',
         schema: yup.object({
            name: yup.string().sanitized(),
            email: yup.string().emailAddress(),
            access_token: yup.string().sanitized(),
         }),
      },
      changePassword: {
         ...getEndpointInfo('/api/user/auth/changePassword'),
         header: 'Changing the password',
         schema: yup.object({
            password: yup.string().password(),
            repeatedPassword: yup.string().repeatedPassword(),
         }),
      },
      checkPasswordToken: {
         ...getEndpointInfo('/api/user/auth/checkPasswordToken'),
         header: 'Recovering the password',
      },
      register: {
         ...getEndpointInfo('/api/user/auth/register'),
         header: 'Account registration',
         schema: yup.object({
            name: yup.string().sanitized(),
            email: yup.string().emailAddress(),
            password: yup.string().password(),
            repeatedPassword: yup.string().repeatedPassword(),
         }),
      },
      recoverPassword: {
         ...getEndpointInfo('/api/user/auth/recoverPassword'),
         header: 'Recovering the password',
         schema: yup.object({ email: yup.string().emailAddress() }),
      },
      resendActivationToken: {
         ...getEndpointInfo('/api/user/auth/resendActivationToken'),
         header: 'Activation token',
         schema: yup.object({ email: yup.string().emailAddress() }),
      },
   }

   public CHAT = {
      getMessagesInfo: {
         ...getEndpointInfo('/api/user/chat/getMessagesInfo'),
         header: '',
      },
      getMessages: {
         ...getEndpointInfo('/api/user/chat/getMessages'),
         header: '',
         schema: yup.object({
            limit: yup.number().required(),
            offset: yup.number().required(),
         }),
      },
      subscribePushNotifications: {
         ...getEndpointInfo('/api/user/chat/subscribePushNotifications'),
         header: '',
         schema: yup.object({
            endpoint: yup.string().sanitized(),
            keys: yup.object({
               auth: yup.string().sanitized(),
               p256dh: yup.string().sanitized(),
            }),
         }),
      },
      sendMessage: {
         ...getEndpointInfo('/api/user/chat/sendMessage'),
         header: '',
      },
      sendFile: {
         ...getEndpointInfo('/api/user/chat/sendFile'),
         header: '',
      },
   }

   public CART = {
      executePayPalPayment: {
         ...getEndpointInfo('/api/user/cart/executePayPalPayment'),
         header: '',
         schema: yup.object({
            paymentId: yup.string().sanitized(),
            PayerID: yup.string().sanitized(),
         }),
      },
      createPayPalPayment: {
         ...getEndpointInfo('/api/user/cart/createPayPalPayment'),
         header: 'Submitting the order',
         schema: yup.object({ products: yup.array().products() }),
      },
      purchaseBooksWithStripe: {
         ...getEndpointInfo('/api/user/cart/purchaseBooksWithStripe'),
         header: 'Submitting the order',
         schema: yup.object({
            paymentId: yup.string().sanitized(),
            products: yup.array().products(),
         }),
      },
   }

   public BOOKS = {
      getSuggestions: {
         ...getEndpointInfo('/api/user/books/getSuggestions'),
         header: '',
         schema: yup.object({
            title: yup.string().sanitized('optional'),
            author: yup.string().sanitized('optional'),
            withProfile: yup.bool().required(),
         }),
      },
   }

   public GLOBAL = {
      checkToken: {
         ...getEndpointInfo('/api/user/global/checkToken'),
         header: '',
      },
      logout: {
         ...getEndpointInfo('/api/user/global/logout'),
         header: '',
      },
   }
}

export const API = new _API()
