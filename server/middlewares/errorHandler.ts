/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application, NextFunction, Request, Response } from 'express'

import { handleError } from 'helpers'

import { ExpressError } from 'types'

export const errorHandler = (app: Application) =>
   app.use((error: ExpressError, _: Request, res: Response, __: NextFunction) =>
      handleError(res, error)
   )
