import { Router } from 'express'

import middlewares from '@middlewares'

import Services from './services'

const router = Router()

router.post(
    '/register',
    Services.register.validation(),
    middlewares.checkValidation,
    Services.register.default
)

router.post(
    '/authenticateEmail',
    Services.authenticateEmail.validation(),
    middlewares.checkValidation,
    Services.authenticateEmail.default
)

router.post(
    '/resendEmail',
    Services.resendEmail.validation(),
    middlewares.checkValidation,
    Services.resendEmail.default
)

router.post(
    '/login',
    Services.login.validation(),
    middlewares.checkValidation,
    Services.login.default
)

router.post(
    '/loginWithFacebook',
    middlewares.facebookAuthorization,
    Services.loginWithFacebook.validation(),
    middlewares.checkValidation,
    Services.loginWithFacebook.default
)

router.post(
    '/recoverPassword',
    Services.recoverPassword.validation(),
    middlewares.checkValidation,
    Services.recoverPassword.default
)

router.post(
    '/checkPasswordToken',
    Services.checkPasswordToken.validation(),
    middlewares.checkValidation,
    Services.checkPasswordToken.default
)

router.post(
    '/changePassword',
    Services.changePassword.validation(),
    middlewares.checkValidation,
    Services.changePassword.default
)

router.post(
    '/getBooks',
    middlewares.jwtAuthorization,
    Services.getBooks.validation(),
    middlewares.checkValidation,
    Services.getBooks.default
)

router.post(
    '/getSuggestions',
    middlewares.jwtAuthorization,
    Services.getSuggestions.validation(),
    middlewares.checkValidation,
    Services.getSuggestions.default
)

router.post(
    '/borrowBook',
    middlewares.jwtAuthorization,
    Services.borrowBook.validation(),
    middlewares.checkValidation,
    Services.borrowBook.default
)

router.post(
    '/getCart',
    middlewares.jwtAuthorization,
    Services.getCart.validation(),
    middlewares.checkValidation,
    Services.getCart.default
)

router.post(
    '/purchaseBooksWithStripe',
    middlewares.jwtAuthorization,
    Services.purchaseBooksWithStripe.validation(),
    middlewares.checkValidation,
    Services.purchaseBooksWithStripe.default
)

router.post(
    '/createPayPalPayment',
    middlewares.jwtAuthorization,
    Services.createPayPalPayment.validation(),
    middlewares.checkValidation,
    Services.createPayPalPayment.default
)

router.post(
    '/executePayPalPayment',
    middlewares.jwtAuthorization,
    Services.executePayPalPayment.validation(),
    middlewares.checkValidation,
    Services.executePayPalPayment.default
)

router.get('/getUserBooks', middlewares.jwtAuthorization, Services.getUserBooks.default)

router.post(
    '/sendMessage',
    middlewares.jwtAuthorization,
    Services.sendMessage.validation(),
    middlewares.checkValidation,
    Services.sendMessage.default
)

router.get('/getMessages', middlewares.jwtAuthorization, Services.getMessages.default)

export default router
