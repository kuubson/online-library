import type { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import type { ObjectShape } from 'yup/lib/object'

import { yup } from 'helpers'

import { ApiError } from 'utils'

type Schema = {
   body?: ObjectShape
   cookies?: ObjectShape
}

export const yupValidation =
   ({ body, cookies }: Schema) =>
   async (req: Request, _: Response, next: NextFunction) => {
      try {
         const schema = yup.object({
            body: yup.object({ ...body }),
            cookies: yup.object({ ...cookies }),
         })

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
