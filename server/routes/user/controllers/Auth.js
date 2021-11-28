import { Router } from 'express'

import middlewares from '@middlewares'

import auth from '../services/auth'

const router = Router()

router.post(
    '/register',
    middlewares.rateLimiter('registration'),
    auth.register.validation(),
    middlewares.checkValidation,
    auth.register.default
)

router.post(
    '/authenticateEmail',
    middlewares.rateLimiter('email authentication'),
    auth.authenticateEmail.validation(),
    middlewares.checkValidation,
    auth.authenticateEmail.default
)

router.post(
    '/resendEmail',
    middlewares.rateLimiter('resending email'),
    auth.resendEmail.validation(),
    middlewares.checkValidation,
    auth.resendEmail.default
)

router.post(
    '/login',
    middlewares.rateLimiter('login'),
    auth.login.validation(),
    middlewares.checkValidation,
    auth.login.default
)

router.post(
    '/loginWithFacebook',
    middlewares.rateLimiter('login'),
    middlewares.facebookAuthorization,
    auth.loginWithFacebook.validation(),
    middlewares.checkValidation,
    auth.loginWithFacebook.default
)

router.post(
    '/recoverPassword',
    middlewares.rateLimiter('recovering password'),
    auth.recoverPassword.validation(),
    middlewares.checkValidation,
    auth.recoverPassword.default
)

router.post(
    '/checkPasswordToken',
    middlewares.rateLimiter('recovering password'),
    auth.checkPasswordToken.validation(),
    middlewares.checkValidation,
    auth.checkPasswordToken.default
)

router.post(
    '/changePassword',
    middlewares.rateLimiter('changing password'),
    auth.changePassword.validation(),
    middlewares.checkValidation,
    auth.changePassword.default
)

export default router
