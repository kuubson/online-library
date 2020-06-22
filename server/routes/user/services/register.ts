import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'

import utils from '../../../utils'

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body
            console.log({ name, email, password })
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
            .withMessage('Name contains invalid characters'),
        check('email')
            .trim()
            .notEmpty()
            .withMessage('Type your e-mail')
            .bail()
            .isEmail()
            .withMessage('Type proper e-mail')
            .normalizeEmail(),
        check('password')
            .trim()
            .notEmpty()
            .withMessage('Type your password')
            .bail()
            .custom(password => {
                if (!/(?=.{10,})/.test(password)) {
                    throw new Error('Password must be at least 10 characters long')
                }
                if (!/(?=.*[a-z])/.test(password)) {
                    throw new Error('Password must contain at least one small letter')
                }
                if (!/(?=.*[A-Z])/.test(password)) {
                    throw new Error('Password must contain at least one big letter')
                }
                if (!/(?=.*[0-9])/.test(password)) {
                    throw new Error('Password must contain at least one digit')
                }
                return password
            }),
        check('repeatedPassword').trim().notEmpty().withMessage('You have to type password twice')
    ]
}
