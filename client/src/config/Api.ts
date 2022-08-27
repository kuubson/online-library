class AuthAPI {
   public authenticateEmail = `/api/user/auth/authenticateEmail`

   public login = `/api/user/auth/login`

   public loginWithFacebook = `/api/user/auth/loginWithFacebook`

   public changePassword = `/api/user/auth/changePassword`

   public checkPasswordToken = `/api/user/auth/checkPasswordToken`

   public register = `/api/user/auth/register`

   public passwordSupport = (withPasswordSupport: boolean | undefined) =>
      `/api/user/auth/${withPasswordSupport ? 'recoverPassword' : 'resendEmail'}`
}

class ChatAPI {
   public getMessagesInfo = `/api/user/chat/getMessagesInfo`

   public getMessages = `/api/user/chat/getMessages`

   public subscribePushNotifications = `/api/user/chat/subscribePushNotifications`

   public sendMessage = `/api/user/chat/sendMessage`

   public sendFile = `/api/user/chat/sendFile`
}

class CartAPI {
   public executePayPalPayment = `/api/cart/executePayPalPayment`

   public createPayPalPayment = `/api/cart/createPayPalPayment`

   public purchaseBooksWithStripe = `/api/cart/purchaseBooksWithStripe`
}

class BooksAPI {
   public getSuggestions = `/api/user/books/getSuggestions`
}

class GlobalAPI {
   public checkToken = `/api/user/global/checkToken`

   public logout = `/api/user/global/logout`
}

export const API = {
   auth: new AuthAPI(),
   chat: new ChatAPI(),
   cart: new CartAPI(),
   books: new BooksAPI(),
   global: new GlobalAPI(),
}
