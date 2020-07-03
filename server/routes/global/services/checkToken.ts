import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import jwt from 'jsonwebtoken'

import { Connection, User } from '../../../database/database'

import utils from '../../../utils'

interface IBody {
    token: string
}

interface IJWTData {
    email: string
    role: 'user'
}

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        await Connection.transaction(async transaction => {
            const { token }: IBody = req.cookies
            if (token) {
                return jwt.verify(token, process.env.JWT_KEY, async (error, data: IJWTData) => {
                    try {
                        if (error) {
                            if (error.message.includes('expired')) {
                                throw new utils.ApiError(
                                    'Authorization',
                                    'The authentication cookie has expired, log in again',
                                    401
                                )
                            }
                            throw new utils.ApiError(
                                'Authorization',
                                'The authentication cookie was invalid, log in again',
                                401
                            )
                        }
                        if (data.role === 'user') {
                            const user = await User.findOne({
                                where: {
                                    email: data.email
                                },
                                transaction
                            })
                            if (!user) {
                                throw new utils.ApiError(
                                    'Authorization',
                                    'The authentication cookie was invalid, log in again',
                                    401
                                )
                            }
                            res.send({
                                role: 'user'
                            })
                        }
                    } catch (error) {
                        next(error)
                    }
                })
            } else {
                res.clearCookie('token', {
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: true
                }).send({
                    role: 'guest'
                })
            }
        })
    },
    validation: () => [check('token').optional().trim().notEmpty().isJWT()]
}
