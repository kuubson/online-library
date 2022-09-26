/* eslint-disable @typescript-eslint/no-unused-vars */
import { mapValues } from 'lodash'
import type { OptionalObjectSchema } from 'yup/lib/object'

import type { ApiMethod } from 'types'

import type { SWAGGER_PATHS, api } from './validation'
import { API_PATHS } from './validation'

export const API = mapValues(API_PATHS, (methods, path) => ({
   ...mapValues(methods, ({ responses, validation, summary }, method) => ({
      request: {
         method,
         url: path,
      },
      validation,
      header: summary,
      // TODO: rename errors => responses
      errors: mapValues(responses, ({ description }: { description: string }) => description),
   })),
})) as {
   [path in keyof api]: {
      [method in keyof api[path]]: api[path][method] extends {
         responses: object
         validation: object
      }
         ? ApiMethod<method, keyof api[path][method]['responses'], api[path][method]['validation']>
         : api[path][method] extends {
              responses: object
           }
         ? ApiMethod<method, keyof api[path][method]['responses'], null>
         : api[path][method]
   }
}

/**
 * API type guard = makes sure that keys of "paths" match keys of "swagger.paths" ~~~> API.ts stays more refactorproof
 * if it's red, it means that the keys, you put manually into API_PATHS, are not matched with what backend API exposes
 */

declare function _(api: api): api is {
   [key in keyof SWAGGER_PATHS]: {
      [path in keyof SWAGGER_PATHS]: {
         [method in keyof SWAGGER_PATHS[path]]: SWAGGER_PATHS[path][method] & {
            validation: OptionalObjectSchema<any>
         }
      }
   }[key]
}
