import validator from 'validator'

import utils from 'utils'

export default handleError => {
    const validateProperty = (property, emptyError, sanitizationError) => {
        let isValidated = true
        switch (true) {
            case !property.trim():
                isValidated = false
                handleError(`${property}`, emptyError)
                break
            case utils.checkSanitization(property):
                isValidated = false
                handleError(`${property}`, sanitizationError)
                break
            default:
                handleError(`${property}`, '')
        }
        return isValidated
    }
    const validateEmail = email => {
        let isValidated = true
        switch (true) {
            case !email.trim():
                isValidated = false
                handleError('email', 'Type your email address')
                break
            case !validator.isEmail(email):
                isValidated = false
                handleError('email', 'Type proper email address')
                break
            default:
                handleError('email', '')
        }
        return isValidated
    }
    const validatePassword = (password, repeatedPassword, withLogin = false) => {
        let isValidated = true
        if (!withLogin) {
            switch (true) {
                case !password:
                    isValidated = false
                    handleError('password', 'Type your password')
                    break
                case !/(?=.{10,})/.test(password):
                    isValidated = false
                    handleError('password', 'Password must be at least 10 characters long')
                    break
                case !/(?=.*[a-z])/.test(password):
                    isValidated = false
                    handleError('password', 'Password must contain at least one small letter')
                    break
                case !/(?=.*[A-Z])/.test(password):
                    isValidated = false
                    handleError('password', 'Password must contain at least one big letter')
                    break
                case !/(?=.*[0-9])/.test(password):
                    isValidated = false
                    handleError('password', 'Password must contain at least one digit')
                    break
                default:
                    handleError('password', '')
            }
            switch (true) {
                case repeatedPassword && password !== repeatedPassword:
                    isValidated = false
                    handleError('repeatedPassword', 'Passwords are different')
                    break
                default:
                    handleError('repeatedPassword', '')
            }
        } else {
            switch (true) {
                case !password:
                    isValidated = false
                    handleError('password', 'Type your password')
                    break
                default:
                    handleError('password', '')
            }
        }
        return isValidated
    }
    const validateRepeatedPassword = (repeatedPassword, password) => {
        let isValidated = true
        switch (true) {
            case !repeatedPassword:
                isValidated = false
                handleError('repeatedPassword', 'You have to type password twice')
                break
            case repeatedPassword !== password:
                isValidated = false
                handleError('repeatedPassword', 'Passwords are different')
                break
            default:
                handleError('repeatedPassword', '')
        }
        return isValidated
    }
    return {
        validateProperty,
        validateEmail,
        validatePassword,
        validateRepeatedPassword
    }
}
