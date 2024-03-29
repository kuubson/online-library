import type { Application, NextFunction, Request, Response } from 'express'

import type { ApiError } from '@online-library/config'
import {
   AuthError,
   AuthErrorBase,
   CSRFError,
   EmptyFileError,
   RequestError,
   isProd,
} from '@online-library/config'

import { cookie } from 'utils'

type Error = ApiError & {
   code?: 'EBADCSRFTOKEN'
}

export const formatErrors = (app: Application) =>
   app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
      if (!isProd) {
         console.log(error)
      }

      const { status, errorHeader, errorMessage } = error

      if (status === 403 && error.code === 'EBADCSRFTOKEN') {
         return res.clearCookie('authToken', cookie()).status(status).send(CSRFError)
      }

      if (error instanceof AuthErrorBase) {
         return res.clearCookie('authToken', cookie()).status(status).send(AuthError)
      }

      if ((error as ApiError).message === 'Empty file') {
         return res.status(422).send(EmptyFileError)
      }

      res.status(status).send({
         errorHeader: errorHeader || RequestError.errorHeader,
         errorMessage: errorMessage || RequestError.errorMessage,
      })
   })
