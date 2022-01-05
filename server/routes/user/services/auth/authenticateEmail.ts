import jwt from 'jsonwebtoken'

import { Connection, Authentication } from 'database'

import { validator } from 'helpers'

import { ApiError } from 'utils'

import { Route } from 'types/express'

export const authenticateEmail: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { token } = req.body
            return jwt.verify(token, process.env.JWT_KEY!, async (error: any) => {
                try {
                    const authentication = await Authentication.findOne({
                        where: {
                            token
                        }
                    })
                    if (error || !authentication) {
                        if (authentication && error.message.includes('expired')) {
                            throw new ApiError(
                                'Email address authentication',
                                'The activation link has expired',
                                400
                            )
                        }
                        throw new ApiError(
                            'Email address authentication',
                            'The activation link is invalid',
                            400
                        )
                    }
                    if (authentication.authenticated) {
                        throw new ApiError(
                            'Email address authentication',
                            'An account assigned to email address provided is already authenticated',
                            400
                        )
                    }
                    await authentication.update(
                        {
                            authenticated: true
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
    } catch (error) {
        next(error)
    }
}

export const validation = () => [validator.validateProperty('token').isJWT()]
