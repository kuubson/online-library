import type { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import type { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

import { DataValidationError } from '@online-library/config'

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
            query: req.query,
         })
         next()
      } catch (error) {
         if (error instanceof ValidationError) {
            next(DataValidationError)
         }
         next(error)
      }
   }
