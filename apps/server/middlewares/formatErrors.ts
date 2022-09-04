/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Application, NextFunction, Request, Response } from 'express'

import type { ApiError } from 'online-library'
import { AuthError, CSRFError, RequestError } from 'online-library'

import { NODE_ENV } from 'config'

import { cookie } from 'utils'

type Error = ApiError & {
   code?: 'EBADCSRFTOKEN'
}

export const formatErrors = (app: Application) =>
   app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
      if (NODE_ENV !== 'production') {
         console.log(error)
      }

      const { status, errorHeader, errorMessage } = error

      if (status === 403 && error.code === 'EBADCSRFTOKEN') {
         res.clearCookie('token', cookie()).status(status).send(CSRFError)
      }

      if (status === 401) {
         res.clearCookie('token', cookie()).status(status).send(AuthError)
      }

      if ((error as ApiError).message === 'Empty file') {
         res.status(422).send({
            errorHeader: 'Sending a file',
            errorMessage: 'The selected text file is empty',
         })
      }

      res.status(status).send({
         errorHeader: errorHeader || RequestError.errorHeader,
         errorMessage: errorMessage || RequestError.errorMessage,
      })
   })
