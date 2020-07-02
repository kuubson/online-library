import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Connection, User } from '../../../database/database'

import utils from '../../../utils'

interface IBody {
    password: string
    repeatedPassword: string
    passwordToken: string
}

interface IJWTData {
    email: string
}

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        await Connection.transaction(async transaction => {
            const { password, passwordToken }: IBody = req.body
            return jwt.verify(passwordToken, process.env.JWT_KEY, async (error, data: IJWTData) => {
                try {
                    if (error) {
                        if (error.message.includes('expired')) {
                            throw new utils.ApiError(
                                'Password recovery',
                                'The password recovery link has expired',
                                400
                            )
                        }
                        throw new utils.ApiError(
                            'Password recovery',
                            'The password recovery link is invalid',
                            400
                        )
                    }
                    const user = await User.findOne({
                        where: {
                            email: data.email,
                            passwordToken
                        },
                        transaction
                    })
                    if (!user) {
                        throw new utils.ApiError(
                            'Password recovery',
                            'The password recovery link is invalid',
                            404
                        )
                    }
                    await user.update({
                        password: bcrypt.hashSync(password, 11),
                        passwordToken: null
                    })
                    res.send({
                        success: true
                    })
                } catch (error) {
                    next(error)
                }
            })
        })
    },
    validation: () => [
        check('password')
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
        check('repeatedPassword').trim().notEmpty().withMessage('You have to type password twice'),
        check('passwordToken').trim().notEmpty().isJWT()
    ]
}
