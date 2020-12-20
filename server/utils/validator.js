import { check } from 'express-validator'

import utils from '@utils'

const validateProperty = (property, emptyError, sanitizationError) => {
    if (emptyError && sanitizationError) {
        return check(`${property}`)
            .trim()
            .notEmpty()
            .withMessage(`${emptyError}`)
            .bail()
            .custom(utils.checkSanitization)
            .withMessage(`${sanitizationError}`)
            .bail()
    }
    return check(`${property}`).trim().notEmpty().bail()
}
const validateInteger = property => {
    return check(`${property}`).trim().notEmpty().bail().isInt().escape()
}
const validateBoolean = property => {
    return check(`${property}`).notEmpty().isBoolean().bail()
}
const validateArray = (property, canBeEmpty) => {
    if (!canBeEmpty) {
        return check(`${property}`).isArray().bail().notEmpty().bail()
    }
    return check(`${property}`).isArray().bail()
}
const validateEmail = () =>
    check('email')
        .trim()
        .notEmpty()
        .withMessage('Type your email')
        .bail()
        .isEmail()
        .withMessage('Type proper email')
        .normalizeEmail()
const validatePassword = (withLogin = false) =>
    !withLogin
        ? check('password')
              .notEmpty()
              .withMessage('Type your password')
              .bail()
              .custom((password, { req }) => {
                  if (!/(?=.{10,})/.test(password)) {
                      throw new Error('Password must be at least 10 characters long')
                  }
                  if (!/(?=.*[a-z])/.test(password)) {
                      throw new Error('Password must contain at least one small letter')
                  }
                  if (!/(?=.*[A-Z])/.test(password)) {
                      throw new Error('Password must contain at least one big letter')
                  }
                  if (!/(?=.*[0-9])/.test(password)) {
                      throw new Error('Password must contain at least one digit')
                  }
                  if (password !== req.body.password) {
                      throw new Error('Passwords are different')
                  }
                  return password
              })
        : check('password').notEmpty().withMessage('Type your password')
const validateRepeatedPassword = () =>
    check('repeatedPassword')
        .trim()
        .notEmpty()
        .withMessage('You have to type password twice')
        .custom((repeatedPassword, { req }) => {
            if (repeatedPassword !== req.body.password) {
                throw new Error('Passwords are different')
            }
            return repeatedPassword
        })

export default {
    validateProperty,
    validateInteger,
    validateBoolean,
    validateArray,
    validateEmail,
    validatePassword,
    validateRepeatedPassword
}
