import type { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import type { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

import { ApiError } from 'utils'

type Schema<T extends ObjectShape> = {
   schema: OptionalObjectSchema<T>
}

export const yupValidation =
   <T extends ObjectShape>({ schema }: Schema<T>) =>
   async (req: Request, _: Response, next: NextFunction) => {
      try {
         await schema.validate({
            body: req.body,
            cookies: req.cookies,
         })
         next()
      } catch (err) {
         if (err instanceof ValidationError) {
            next(new ApiError('Request processing', 'Something went wrong! Try again', 422))
         }
         next(err)
      }
   }
