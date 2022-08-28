import type { Endpoint } from 'shared/'
import { swagger } from 'shared/'

type Endpoints = Record<Endpoint, Endpoint>

const ENDPOINTS: Endpoints = Object.keys(swagger['paths']).reduce(
   (endpoints, endpoint) => ({
      ...endpoints,
      [endpoint]: endpoint,
   }),
   {} as Endpoints
)

class _AuthAPI {
   public authenticateEmail = ENDPOINTS['/api/user/auth/authenticateEmail']

   public login = ENDPOINTS['/api/user/auth/login']

   public loginWithFacebook = ENDPOINTS['/api/user/auth/loginWithFacebook']

   public changePassword = ENDPOINTS['/api/user/auth/changePassword']

   public checkPasswordToken = ENDPOINTS['/api/user/auth/checkPasswordToken']

   public register = ENDPOINTS['/api/user/auth/register']

   public recoverPassword = ENDPOINTS['/api/user/auth/recoverPassword']

   public resendEmail = ENDPOINTS['/api/user/auth/resendEmail']
}

class _ChatAPI {
   public getMessagesInfo = ENDPOINTS['/api/user/chat/getMessagesInfo']

   public getMessages = ENDPOINTS['/api/user/chat/getMessages']

   public subscribePushNotifications = ENDPOINTS['/api/user/chat/subscribePushNotifications']

   public sendMessage = ENDPOINTS['/api/user/chat/sendMessage']

   public sendFile = ENDPOINTS['/api/user/chat/sendFile']
}

class _CartAPI {
   public executePayPalPayment = ENDPOINTS['/api/user/cart/executePayPalPayment']

   public createPayPalPayment = ENDPOINTS['/api/user/cart/createPayPalPayment']

   public purchaseBooksWithStripe = ENDPOINTS['/api/user/cart/purchaseBooksWithStripe']
}

class _BooksAPI {
   public getSuggestions = ENDPOINTS['/api/user/books/getSuggestions']
}

class _GlobalAPI {
   public checkToken = ENDPOINTS['/api/user/global/checkToken']

   public logout = ENDPOINTS['/api/user/global/logout']
}

export const AuthAPI = new _AuthAPI()

export const ChatAPI = new _ChatAPI()

export const CartAPI = new _CartAPI()

export const BooksAPI = new _BooksAPI()

export const GlobalAPI = new _GlobalAPI()
