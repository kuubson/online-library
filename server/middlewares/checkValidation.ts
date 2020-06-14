import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export default (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req)
    if (!results.isEmpty()) {
        res.status(422).send({
            results: results.array().map(({ param, msg }) => {
                return {
                    parameter: param,
                    error: msg
                }
            })
        })
    } else {
        next()
    }
}
