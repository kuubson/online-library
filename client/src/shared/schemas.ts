import sanitize from 'sanitize-html'
import validator from 'validator'

import { yup } from './yup'

export const email = yup
   .string()
   .required()
   .test('test-email', 'Enter a valid email address', email => validator.isEmail(email || ''))

export const password = yup
   .string()
   .required()
   .test('test-password', 'Password too weak (8 chars/1 lowercase/1 uppercase/1 digit)', password =>
      validator.isStrongPassword(password || '', { minSymbols: 0 })
   )

export const uncheckedPassword = yup.string().required()

export const repeatedPassword = (key = 'password') =>
   yup
      .string()
      .required()
      .test(
         'test-repeatedPassword',
         'Passwords are different',
         (repeatedPassword, { parent }) => parent[key] === repeatedPassword
      )

export const string = yup
   .string()
   .required()
   .test(
      'test-string',
      'Input contains incorrect characters',
      value => value === sanitize(value || '')
   )

export const products = yup.array().required().min(1).of(string).required()

export const bool = yup.bool().required()

export const integer = yup.number().required()
