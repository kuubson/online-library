import { validationResult } from 'express-validator'

const checkValidation = (req, res, next) => {
    const results = validationResult(req)
    if (!results.isEmpty()) {
        return res.status(422).send({
            results: results.array().map(({ param, msg }) => {
                return {
                    parameter: param,
                    error: msg
                }
            })
        })
    }
    next()
}

export default checkValidation
