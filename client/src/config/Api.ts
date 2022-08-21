const userApi = '/api/user'

const globalApi = ``

class _API {
   public authenticateEmail = `${userApi}/auth/authenticateEmail`

   public login = `${userApi}/auth/login`

   public loginWithFacebook = `${userApi}/auth/loginWithFacebook`

   public changePassword = `${userApi}/auth/changePassword`

   public checkPasswordToken = `${userApi}/auth/checkPasswordToken`

   public register = `${userApi}/auth/register`

   public passwordSupport = (withPasswordSupport: boolean | undefined) =>
      `/api/user/auth/${withPasswordSupport ? 'recoverPassword' : 'resendEmail'}`

   public checkToken = `${globalApi}/auth/checkToken`

   public getMessagesInfo = `${userApi}/chat/getMessagesInfo`

   public executePayPalPayment = `${userApi}/cart/executePayPalPayment`

   public createPayPalPayment = `${userApi}/cart/createPayPalPayment`

   public purchaseBooksWithStripe = `${userApi}/cart/purchaseBooksWithStripe`

   public getMessages = `${userApi}/chat/getMessages`

   public subscribePushNotifications = `${userApi}/chat/subscribePushNotifications`

   public sendMessage = `${userApi}/chat/sendMessage`

   public sendFile = `${userApi}/chat/sendFile`

   public getSuggestions = `${userApi}/books/getSuggestions`

   public logout = `${globalApi}/auth/logout`
}

export const API = new _API()
