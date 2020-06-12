import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'

import utils from '@utils'

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body
            console.log(name, email, password)
            res.send({
                success: true
            })
        } catch (error) {
            next(error)
        }
    },
    validation: () => [
        check('name')
            .trim()
            .notEmpty()
            .withMessage('Type your name')
            .bail()
            .custom(utils.checkSanitization)
            .withMessage('Name contains illegal characters'),
        check('email')
            .trim()
            .notEmpty()
            .withMessage('Type your e-mail')
            .bail()
            .isEmail()
            .withMessage('Type proper e-mail')
            .normalizeEmail()
    ]
}
