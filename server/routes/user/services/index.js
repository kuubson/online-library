import register from './register'
import authenticateEmail from './authenticateEmail'
import resendEmail from './resendEmail'
import login from './login'
import loginWithFacebook from './loginWithFacebook'
import recoverPassword from './recoverPassword'
import checkPasswordToken from './checkPasswordToken'
import changePassword from './changePassword'
import getBooks from './getBooks'
import getSuggestions from './getSuggestions'
import borrowBook from './borrowBook'
import getCart from './getCart'
import purchaseBooksWithStripe from './purchaseBooksWithStripe'
import createPayPalPayment from './createPayPalPayment'
import executePayPalPayment from './executePayPalPayment'
import getUserBooks from './getUserBooks'

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
    getUserBooks
}
