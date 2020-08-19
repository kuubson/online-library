import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { Connection, User } from '../../../database/database'

import utils from '../../../utils'

interface IBody {
    token: string
}

export interface IJWTData {
    email: string
    role: 'user' | 'admin'
}

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        await Connection.transaction(async transaction => {
            const { token }: IBody = req.cookies
            if (!token) {
                return res
                    .clearCookie('token', {
                        secure: process.env.NODE_ENV === 'production',
                        httpOnly: true,
                        sameSite: true
                    })
                    .send({
                        role: 'guest'
                    })
            }
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
                            'The authentication cookie is invalid, log in again',
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
                                'The authentication cookie is invalid, log in again',
                                401
                            )
                        }
                        res.send({
                            role: 'user'
                        })
                    } else {
                        throw new utils.ApiError(
                            'Authorization',
                            'The authentication cookie is invalid, log in again',
                            401
                        )
                    }
                } catch (error) {
                    next(error)
                }
            })
        })
    },
    validation: () => [utils.validator.validateProperty('token').optional()]
}
