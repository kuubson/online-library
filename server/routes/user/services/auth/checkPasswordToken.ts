import jwt from 'jsonwebtoken'

import { Connection, User } from 'database'

import { validator } from 'helpers'

import { ApiError } from 'utils'

import { Route } from 'types/express'

export const checkPasswordToken: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { passwordToken } = req.body
            return jwt.verify(
                passwordToken,
                process.env.JWT_KEY!,
                async (error: any, data: any) => {
                    try {
                        if (error) {
                            if (error.message.includes('expired')) {
                                throw new ApiError(
                                    'Password recovery',
                                    'The password recovery link has expired',
                                    400
                                )
                            }
                            throw new ApiError(
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
                            throw new ApiError(
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
                }
            )
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [validator.validateProperty('passwordToken').isJWT()]
