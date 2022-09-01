import jwt from 'jsonwebtoken'

import { User } from 'database'

import { validator } from 'helpers'

import { ApiError } from 'utils'

import { Route } from 'types/express'

export const checkPasswordToken: Route = async (req, res, next) => {
    try {
        const { passwordToken } = req.body
        return jwt.verify(passwordToken, process.env.JWT_KEY!, async (error: any, data: any) => {
            try {
                const user = await User.findOne({
                    where: {
                        email: data.email,
                        passwordToken
                    }
                })
                if (error || !user) {
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
                res.send({
                    success: true
                })
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [validator.validateProperty('passwordToken').isJWT()]
