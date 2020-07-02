import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Connection, User } from '../../../database/database'

import utils from '../../../utils'

const { JWT_KEY, NODE_ENV } = process.env

interface IBody {
    email: string
    password: string
}

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Connection.transaction(async transaction => {
                const { email, password }: IBody = req.body
                const user = await User.findOne({
                    where: {
                        email
                    },
                    transaction
                })
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    throw new utils.ApiError(
                        'Logging to app',
                        'The email or password provided are invalid',
                        404
                    )
                }
                const token = jwt.sign({ email, role: 'user' }, JWT_KEY)
                res.cookie('token', token, {
                    secure: NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: true,
                    maxAge: 168 * 60 * 60 * 1000 // 168 hours (7 days)
                }).send({
                    success: true
                })
            })
        } catch (error) {
            next(error)
        }
    },
    validation: () => [
        check('email')
            .trim()
            .notEmpty()
            .withMessage('Type your email')
            .bail()
            .isEmail()
            .withMessage('Type proper email')
            .normalizeEmail(),
        check('password').notEmpty().withMessage('Type your password')
    ]
}
