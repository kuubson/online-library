import { check } from 'express-validator'

import { checkSanitization } from 'helpers'

const validateProperty = (property: string) => {
    return check(`${property}`)
        .trim()
        .notEmpty()
        .withMessage('This field cannot be empty')
        .bail()
        .isString()
        .bail()
        .custom(checkSanitization)
        .withMessage('This field contains incorrect characters')
        .bail()
}
const validateInteger = (property: string) => {
    return check(`${property}`).notEmpty().bail().isInt().bail()
}
const validateBoolean = (property: string) => {
    return check(`${property}`).isBoolean().bail()
}
const validateArray = (property: string, canBeEmpty: boolean) => {
    if (!canBeEmpty) {
        return check(`${property}`).notEmpty().bail().isArray().bail()
    } else {
        return check(`${property}`).isArray().bail()
    }
}
const validateEmail = () => {
    return check('email')
        .trim()
        .notEmpty()
        .withMessage('Type your email address')
        .bail()
        .isEmail()
        .withMessage('Type proper email address')
        .normalizeEmail()
}
const validatePassword = (withLogin = false) => {
    if (!withLogin) {
        return check('password')
            .notEmpty()
            .withMessage('Type your password')
            .bail()
            .custom((password: string, { req }) => {
                if (!/(?=.{8,})/.test(password)) {
                    throw new Error('Password must be at least 8 characters long')
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
    } else {
        return check('password').notEmpty().withMessage('Type your password')
    }
}
const validateRepeatedPassword = () => {
    return check('repeatedPassword')
        .notEmpty()
        .withMessage('Type password twice')
        .bail()
        .custom((repeatedPassword: string, { req }) => {
            if (repeatedPassword !== req.body.password) {
                throw new Error('Passwords are different')
            }
            return repeatedPassword
        })
}

export const validator = {
    validateProperty,
    validateInteger,
    validateBoolean,
    validateArray,
    validateEmail,
    validatePassword,
    validateRepeatedPassword
}
