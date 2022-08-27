import { API } from 'shared'

class _AuthAPI {
   public authenticateEmail = API['/api/user/auth/authenticateEmail']

   public login = API['/api/user/auth/login']

   public loginWithFacebook = API['/api/user/auth/loginWithFacebook']

   public changePassword = API['/api/user/auth/changePassword']

   public checkPasswordToken = API['/api/user/auth/checkPasswordToken']

   public register = API['/api/user/auth/register']

   public recoverPassword = API['/api/user/auth/recoverPassword']

   public resendEmail = API['/api/user/auth/resendEmail']
}

class _ChatAPI {
   public getMessagesInfo = API['/api/user/chat/getMessagesInfo']

   public getMessages = API['/api/user/chat/getMessages']

   public subscribePushNotifications = API['/api/user/chat/subscribePushNotifications']

   public sendMessage = API['/api/user/chat/sendMessage']

   public sendFile = API['/api/user/chat/sendFile']
}

class _CartAPI {
   public executePayPalPayment = API['/api/user/cart/executePayPalPayment']

   public createPayPalPayment = API['/api/user/cart/createPayPalPayment']

   public purchaseBooksWithStripe = API['/api/user/cart/purchaseBooksWithStripe']
}

class _BooksAPI {
   public getSuggestions = API['/api/user/books/getSuggestions']
}

class _GlobalAPI {
   public checkToken = API['/api/user/global/checkToken']

   public logout = API['/api/user/global/logout']
}

export const AuthAPI = new _AuthAPI()

export const ChatAPI = new _ChatAPI()

export const CartAPI = new _CartAPI()

export const BooksAPI = new _BooksAPI()

export const GlobalAPI = new _GlobalAPI()
