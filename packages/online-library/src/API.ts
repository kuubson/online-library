import { email, password, repeatedPassword, string, uncheckedPassword } from './schemas'
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
            email,
            password: uncheckedPassword,
         }),
      },
      loginWithFacebook: {
         ...getEndpointInfo('/api/user/auth/loginWithFacebook'),
         header: 'Authentication',
         schema: yup.object({
            name: string,
            email,
            access_token: string,
         }),
      },
      changePassword: {
         ...getEndpointInfo('/api/user/auth/changePassword'),
         header: 'Changing the password',
         schema: yup.object({
            password,
            repeatedPassword: repeatedPassword(),
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
            name: string,
            email,
            password,
            repeatedPassword: repeatedPassword(),
         }),
      },
      recoverPassword: {
         ...getEndpointInfo('/api/user/auth/recoverPassword'),
         header: 'Recovering the password',
         schema: yup.object({ email }),
      },
      resendActivationToken: {
         ...getEndpointInfo('/api/user/auth/resendActivationToken'),
         header: 'Activation token',
         schema: yup.object({ email }),
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
      },
      subscribePushNotifications: {
         ...getEndpointInfo('/api/user/chat/subscribePushNotifications'),
         header: '',
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
      },
      createPayPalPayment: {
         ...getEndpointInfo('/api/user/cart/createPayPalPayment'),
         header: '',
      },
      purchaseBooksWithStripe: {
         ...getEndpointInfo('/api/user/cart/purchaseBooksWithStripe'),
         header: '',
      },
   }

   public BOOKS = {
      getSuggestions: {
         ...getEndpointInfo('/api/user/books/getSuggestions'),
         header: '',
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
