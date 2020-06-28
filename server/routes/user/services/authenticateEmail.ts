import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import jwt from 'jsonwebtoken'

import { Connection, User, Authentication } from '../../../database/database'

import utils from '../../../utils'

interface IBody {
    token: string
}

interface IJWTData {
    email: string
    exp: number
}

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        await Connection.transaction(async transaction => {
            const { token }: IBody = req.body
            jwt.verify(token, process.env.JWT_KEY, async (error, data: IJWTData) => {
                try {
                    const authentication = await Authentication.findOne({
                        where: {
                            token
                        }
                    })
                    if (error) {
                        if (authentication && error.message.includes('expired')) {
                            throw new utils.ApiError(
                                'E-mail address authentication',
                                'The token has expired',
                                401
                            )
                        }
                        throw new utils.ApiError(
                            'E-mail address authentication',
                            'The token provided is invalid',
                            400
                        )
                    }
                    const user = await User.findOne({
                        where: {
                            email: data.email
                        }
                    })
                    if (!user || !authentication) {
                        throw new utils.ApiError(
                            'E-mail address authentication',
                            'The token provided is invalid',
                            400
                        )
                    }
                    if (authentication.isAuthenticated) {
                        throw new utils.ApiError(
                            'E-mail address authentication',
                            'The token provided is already authenticated',
                            400
                        )
                    }
                    await authentication.update(
                        {
                            isAuthenticated: true
                        },
                        {
                            transaction
                        }
                    )
                    res.send({
                        success: true
                    })
                } catch (error) {
                    next(error)
                }
            })
        })
    },
    validation: () => [check('token').trim().notEmpty()]
}
