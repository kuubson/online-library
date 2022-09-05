import { lowerCase } from 'lodash'
import sanitize from 'sanitize-html'
import validator from 'validator'
import * as _yup from 'yup'
import type Lazy from 'yup/lib/Lazy'
import type { AssertsShape, ObjectShape, TypeOfShape } from 'yup/lib/object'
import type BaseSchema from 'yup/lib/schema'
import type { AnySchema } from 'yup/lib/schema'
import type { RequiredStringSchema } from 'yup/lib/string'

import type { AnyObject, Maybe, Optionals } from 'yup/lib/types'
import type { Asserts, TypeOf } from 'yup/lib/util/types'

const errorForRequiredProperty = (path: string) => `${lowerCase(path)} is required`

_yup.setLocale({ mixed: { required: ({ path }) => errorForRequiredProperty(path) } })

_yup.addMethod(_yup.string, 'emailAddress', function () {
   return this.required().test('test-emailAddress', 'Enter a valid email address', email =>
      email ? validator.isEmail(email) : false
   )
})

_yup.addMethod(_yup.string, 'password', function () {
   return this.required().test(
      'test-password',
      'Password too weak (8 chars/1 lowercase/1 uppercase/1 digit)',
      password =>
         password
            ? validator.isStrongPassword(password, {
                 minSymbols: 0,
                 returnScore: false,
              })
            : false
   )
})

_yup.addMethod(_yup.string, 'uncheckedPassword', function () {
   return this.required()
})

_yup.addMethod(_yup.string, 'repeatedPassword', function (key = 'password') {
   return this.required().test(
      'test-repeatedPassword',
      'Passwords are different',
      (repeatedPassword, { parent }) => parent[key] === repeatedPassword
   )
})

type SanitizedStringState = 'required' | 'optional'

_yup.addMethod(_yup.string, 'sanitized', function (state: SanitizedStringState = 'required') {
   const allowEmptyValue = state === 'required' ? false : state === 'optional'
   return this[state]()
      .trim()
      .test('test-sanitized', 'Input contains incorrect characters', value =>
         value ? value === sanitize(value) : allowEmptyValue
      )
})

_yup.addMethod(_yup.array, 'products', function () {
   return this.required().min(1).of(yup.number().required())
})

_yup.addMethod(_yup.object, 'noOtherKeys', function () {
   return this.noUnknown().strict()
})

declare module 'yup' {
   interface StringSchema<
      TType extends Maybe<string> = string | undefined,
      TContext extends AnyObject = AnyObject,
      TOut extends TType = TType
   > extends _yup.BaseSchema<TType, TContext, TOut> {
      emailAddress(): RequiredStringSchema<TType, TContext>
      password(): RequiredStringSchema<TType, TContext>
      repeatedPassword(key?: string): RequiredStringSchema<TType, TContext>
      uncheckedPassword(): RequiredStringSchema<TType, TContext>
      sanitized(state?: SanitizedStringState): RequiredStringSchema<TType, TContext>
   }
   interface ArraySchema<
      T extends AnySchema | Lazy<any, any>,
      C extends AnyObject = AnyObject,
      TIn extends Maybe<TypeOf<T>[]> = TypeOf<T>[] | undefined,
      TOut extends Maybe<Asserts<T>[]> = Asserts<T>[] | Optionals<TIn>
   > extends BaseSchema<TIn, C, TOut> {
      products(): this
   }

   interface ObjectSchema<
      TShape extends ObjectShape,
      TContext extends AnyObject = AnyObject,
      TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>,
      TOut extends Maybe<AssertsShape<TShape>> = AssertsShape<TShape> | Optionals<TIn>
   > extends BaseSchema<TIn, TContext, TOut> {
      noOtherKeys(): this
   }
}

export const yup = _yup
