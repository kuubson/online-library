/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Application, NextFunction, Request, Response } from 'express'

import { handleError } from 'helpers'

import type { ExpressError } from 'types'

export const errorHandler = (app: Application) =>
   app.use((error: ExpressError, _: Request, res: Response, __: NextFunction) =>
      handleError(res, error)
   )
