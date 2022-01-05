import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Connection, User } from 'database'

import utils from 'utils'

import { Route } from 'types/express'

const changePassword: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { password, passwordToken } = req.body
            return jwt.verify(
                passwordToken,
                process.env.JWT_KEY!,
                async (error: any, data: any) => {
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
                        await user.update(
                            {
                                password: bcrypt.hashSync(password, 11),
                                passwordToken: null
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
                }
            )
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    utils.validator.validatePassword(),
    utils.validator.validateRepeatedPassword(),
    utils.validator.validateProperty('passwordToken').isJWT()
]

export default changePassword
