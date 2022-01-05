import { Router } from 'express'

import { rateLimiter, facebookAuthorization, checkValidation } from 'middlewares'

import { auth } from '../services'

export const Auth = Router()

Auth.post(
    '/register',
    rateLimiter('registration'),
    auth.register.validation(),
    checkValidation,
    auth.register.register
)

Auth.post(
    '/authenticateEmail',
    rateLimiter('email authentication'),
    auth.authenticateEmail.validation(),
    checkValidation,
    auth.authenticateEmail.authenticateEmail
)

Auth.post(
    '/resendEmail',
    rateLimiter('resending email'),
    auth.resendEmail.validation(),
    checkValidation,
    auth.resendEmail.resendEmail
)

Auth.post(
    '/login',
    rateLimiter('login'),
    auth.login.validation(),
    checkValidation,
    auth.login.login
)

Auth.post(
    '/loginWithFacebook',
    rateLimiter('login'),
    facebookAuthorization,
    auth.loginWithFacebook.validation(),
    checkValidation,
    auth.loginWithFacebook.loginWithFacebook
)

Auth.post(
    '/recoverPassword',
    rateLimiter('recovering password'),
    auth.recoverPassword.validation(),
    checkValidation,
    auth.recoverPassword.recoverPassword
)

Auth.post(
    '/checkPasswordToken',
    rateLimiter('recovering password'),
    auth.checkPasswordToken.validation(),
    checkValidation,
    auth.checkPasswordToken.checkPasswordToken
)

Auth.post(
    '/changePassword',
    rateLimiter('changing password'),
    auth.changePassword.validation(),
    checkValidation,
    auth.changePassword.changePassword
)
