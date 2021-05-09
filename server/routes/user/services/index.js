import * as register from './register'
import * as authenticateEmail from './authenticateEmail'
import * as resendEmail from './resendEmail'
import * as login from './login'
import * as loginWithFacebook from './loginWithFacebook'
import * as recoverPassword from './recoverPassword'
import * as checkPasswordToken from './checkPasswordToken'
import * as changePassword from './changePassword'
import * as getBooks from './getBooks'
import * as getSuggestions from './getSuggestions'
import * as borrowBook from './borrowBook'
import * as getCart from './getCart'
import * as purchaseBooksWithStripe from './purchaseBooksWithStripe'
import * as createPayPalPayment from './createPayPalPayment'
import * as executePayPalPayment from './executePayPalPayment'
import * as getUserBooks from './getUserBooks'
import * as getMessages from './getMessages'
import * as sendMessage from './sendMessage'
import * as subscribePushNotifications from './subscribePushNotifications'
import * as getUnreadMessagesAmount from './getUnreadMessagesAmount'

export default {
    register,
    authenticateEmail,
    resendEmail,
    login,
    loginWithFacebook,
    recoverPassword,
    checkPasswordToken,
    changePassword,
    getBooks,
    getSuggestions,
    borrowBook,
    getCart,
    purchaseBooksWithStripe,
    createPayPalPayment,
    executePayPalPayment,
    getUserBooks,
    getMessages,
    sendMessage,
    subscribePushNotifications,
    getUnreadMessagesAmount
}
