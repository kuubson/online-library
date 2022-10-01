import { lowerCase } from 'lodash'
import validator from 'validator'
import * as _yup from 'yup'
import type Lazy from 'yup/lib/Lazy'
import type { RequiredArraySchema } from 'yup/lib/array'
import type { RequiredNumberSchema } from 'yup/lib/number'
import type { AssertsShape, ObjectShape, TypeOfShape } from 'yup/lib/object'
import type BaseSchema from 'yup/lib/schema'
import type { AnySchema } from 'yup/lib/schema'
import type { RequiredStringSchema } from 'yup/lib/string'

import type { AnyObject, Maybe, Optionals } from 'yup/lib/types'
import type { Asserts, TypeOf } from 'yup/lib/util/types'

const errorForRequiredProperty = (path: string) => `${lowerCase(path)} is required`

_yup.setLocale({
   mixed: {
      required: ({ path }) => errorForRequiredProperty(path),
      defined: ({ path }) => errorForRequiredProperty(path),
   },
})

/** STRING */

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

_yup.addMethod(_yup.string, 'repeatedPassword', function (key = 'password') {
   return this.required().test(
      'test-repeatedPassword',
      'Passwords are different',
      (repeatedPassword, { parent }) => parent[key] === repeatedPassword
   )
})

_yup.addMethod(_yup.string, 'noSpecialChars', function () {
   return this.defined().matches(/(^$)|(^[a-zA-Z0-9 ]+$)/, 'Remove special characters')
})

_yup.addMethod(_yup.string, 'plain', function () {
   return this.required().trim()
})

_yup.addMethod(_yup.string, 'booleanAsString', function () {
   return this.required().oneOf(['true', 'false'])
})

/** ARRAY */

_yup.addMethod(_yup.array, 'unique', function () {
   return this.test(
      'test-unique',
      'Found duplicates in the array',
      array => array?.length === new Set(array?.map(value => value)).size
   )
})

_yup.addMethod(_yup.array, 'products', function () {
   return this.required().of(yup.number().required()).min(1).unique()
})

/** OBJECT */

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
      noSpecialChars(): RequiredStringSchema<TType, TContext>
      plain(): RequiredStringSchema<TType, TContext>
      booleanAsString(): RequiredStringSchema<'true' | 'false', TContext>
   }
   interface ArraySchema<
      T extends AnySchema | Lazy<any, any>,
      C extends AnyObject = AnyObject,
      TIn extends Maybe<TypeOf<T>[]> = TypeOf<T>[] | undefined,
      TOut extends Maybe<Asserts<T>[]> = Asserts<T>[] | Optionals<TIn>
   > extends BaseSchema<TIn, C, TOut> {
      unique(): ArraySchema<T>
      products(): RequiredArraySchema<RequiredNumberSchema<number, C>, C, TIn>
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
