import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Connection, User } from 'database'

import { validator } from 'helpers'

import { cookie } from 'utils'

import { Route } from 'types/express'

export const loginWithFacebook: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { name, email, access_token } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const token = jwt.sign({ email, role: 'user' }, process.env.JWT_KEY!)
            if (user) {
                return res
                    .cookie('token', token, {
                        secure: process.env.NODE_ENV === 'production',
                        httpOnly: true,
                        sameSite: true,
                        maxAge: cookie.maxAge
                    })
                    .send({
                        success: true
                    })
            }
            await User.create(
                {
                    name,
                    email,
                    password: bcrypt.hashSync(access_token, 11)
                },
                {
                    transaction
                }
            )
            res.cookie('token', token, {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true,
                maxAge: cookie.maxAge
            }).send({
                success: true
            })
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    validator.validateProperty('name'),
    validator.validateEmail(),
    validator.validateProperty('access_token')
]
