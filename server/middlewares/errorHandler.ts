/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application, NextFunction, Request, Response } from 'express'

import { handleError } from 'helpers'

export const errorHandler = (app: Application) =>
   app.use((error: any, _: Request, res: Response, __: NextFunction) => handleError(res, error))
