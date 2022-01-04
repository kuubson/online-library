import { Application, Request, Response, NextFunction } from 'express'

import utils from 'utils'

const errorHandler = (app: Application) =>
    app.use((error: any, _: Request, res: Response, __: NextFunction) =>
        utils.handleError(res, error)
    )

export default errorHandler
