import { Express, Request, Response, NextFunction } from 'express'

import utils from '../utils'

import { IError } from '../utils/handleError'

export default (app: Express) =>
    app.use((error: IError, _: Request, res: Response, __: NextFunction) =>
        utils.handleError(res, error)
    )
