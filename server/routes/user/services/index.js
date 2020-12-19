import register from './register'
import authenticateEmail from './authenticateEmail'
import resendEmail from './resendEmail'
import login from './login'
import loginWithFacebook from './loginWithFacebook'
import recoverPassword from './recoverPassword'
import checkPasswordToken from './checkPasswordToken'
import changePassword from './changePassword'
import purchaseBooksWithStripe from './purchaseBooksWithStripe'
import createPayPalPayment from './createPayPalPayment'
import executePayPalPayment from './executePayPalPayment'

export default {
    register,
    authenticateEmail,
    resendEmail,
    login,
    loginWithFacebook,
    recoverPassword,
    checkPasswordToken,
    changePassword,
    purchaseBooksWithStripe,
    createPayPalPayment,
    executePayPalPayment
}
