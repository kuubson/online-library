import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import jwt from 'jsonwebtoken'

import { Connection, User } from '../../../database/database'

import utils from '../../../utils'

interface IBody {
    passwordToken: string
}

interface IJWTData {
    email: string
}

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        await Connection.transaction(async transaction => {
            const { passwordToken }: IBody = req.body
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
                    res.send({
                        success: true
                    })
                } catch (error) {
                    next(error)
                }
            })
        })
    },
    validation: () => [check('passwordToken').trim().notEmpty().isJWT()]
}
