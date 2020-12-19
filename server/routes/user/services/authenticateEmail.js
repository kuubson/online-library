import jwt from 'jsonwebtoken'

import { Connection, Authentication } from '@database'

import utils from '@utils'

export default {
    default: async (req, res, next) => {
        await Connection.transaction(async transaction => {
            const { token } = req.body
            return jwt.verify(token, process.env.JWT_KEY, async error => {
                try {
                    const authentication = await Authentication.findOne({
                        where: {
                            token
                        },
                        transaction
                    })
                    if (error) {
                        if (authentication && error.message.includes('expired')) {
                            throw new utils.ApiError(
                                'Email address authentication',
                                'The activation link has expired',
                                400
                            )
                        }
                        throw new utils.ApiError(
                            'Email address authentication',
                            'The activation link is invalid',
                            400
                        )
                    }
                    if (!authentication) {
                        throw new utils.ApiError(
                            'Email address authentication',
                            'The activation link is invalid',
                            404
                        )
                    }
                    if (authentication.isAuthenticated) {
                        throw new utils.ApiError(
                            'Email address authentication',
                            'An account assigned to email address provided is already authenticated',
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
    validation: () => [utils.validator.validateProperty('token').isJWT()]
}
