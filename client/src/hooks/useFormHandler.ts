import type React from 'react'
import sanitize from 'sanitize-html'
import validator from 'validator'

type FormHandler = <T>(setForm: ReactDispatch<T>) => {
   handleInputValue: InputValueHandler
   handleInputError: InputErrorHandler
   validateProperty: PropertyValidator
   validateEmail: EmailValidator
   validatePassword: PasswordValidator
   validateRepeatedPassword: RepeatedPasswordValidator
}

type InputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

type InputErrorHandler = (errorKey: string, error: string) => void

type PropertyValidator = (property: string, value: string) => boolean

type EmailValidator = (email: string) => boolean

type PasswordValidator = (password: string, repeatedPassword: string, withLogin: boolean) => boolean

type RepeatedPasswordValidator = (repeatedPassword: string, password: string) => boolean

export const useFormHandler: FormHandler = setForm => {
   const handleInputValue: InputValueHandler = ({ target: { name, value } }) =>
      setForm(form => ({
         ...form,
         [name]: value,
      }))
   const handleInputError: InputErrorHandler = (errorKey, error) =>
      setForm(form => ({
         ...form,
         [`${errorKey}Error`]: error,
      }))
   const validateProperty: PropertyValidator = (property, value) => {
      let validated = true
      switch (true) {
         case !value.trim():
            validated = false
            handleInputError(property, 'This field cannot be empty')
            break
         case value !== sanitize(value):
            validated = false
            handleInputError(property, 'This field contains incorrect characters')
            break
         default:
            handleInputError(property, '')
      }
      return validated
   }
   const validateEmail: EmailValidator = email => {
      let validated = true
      switch (true) {
         case !email.trim():
            validated = false
            handleInputError('email', 'Type your email address')
            break
         case !validator.isEmail(email):
            validated = false
            handleInputError('email', 'Type proper email address')
            break
         default:
            handleInputError('email', '')
      }
      return validated
   }
   const validatePassword: PasswordValidator = (password, repeatedPassword, withLogin) => {
      let validated = true
      if (!withLogin) {
         switch (true) {
            case !password:
               validated = false
               handleInputError('password', 'Type your password')
               break
            case !/(?=.{8,})/.test(password):
               validated = false
               handleInputError('password', 'Password must be at least 8 characters long')
               break
            case !/(?=.*[a-z])/.test(password):
               validated = false
               handleInputError('password', 'Password must contain at least one small letter')
               break
            case !/(?=.*[A-Z])/.test(password):
               validated = false
               handleInputError('password', 'Password must contain at least one big letter')
               break
            case !/(?=.*[0-9])/.test(password):
               validated = false
               handleInputError('password', 'Password must contain at least one digit')
               break
            default:
               handleInputError('password', '')
         }
         switch (true) {
            case repeatedPassword && password !== repeatedPassword:
               validated = false
               handleInputError('repeatedPassword', 'Passwords are different')
               break
            default:
               handleInputError('repeatedPassword', '')
         }
      } else {
         switch (true) {
            case !password:
               validated = false
               handleInputError('password', 'Type your password')
               break
            default:
               handleInputError('password', '')
         }
      }
      return validated
   }
   const validateRepeatedPassword: RepeatedPasswordValidator = (repeatedPassword, password) => {
      let validated = true
      switch (true) {
         case !repeatedPassword:
            validated = false
            handleInputError('repeatedPassword', 'Type password twice')
            break
         case repeatedPassword !== password:
            validated = false
            handleInputError('repeatedPassword', 'Passwords are different')
            break
         default:
            handleInputError('repeatedPassword', '')
      }
      return validated
   }
   return {
      handleInputValue,
      handleInputError,
      validateProperty,
      validateEmail,
      validatePassword,
      validateRepeatedPassword,
   }
}
