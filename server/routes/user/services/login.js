import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Connection, User } from '@database'

import utils from '@utils'

export default async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                },
                include: ['authentication'],
                transaction
            })
            if (!user || !bcrypt.compareSync(password, user.password)) {
                throw new utils.ApiError(
                    'Logging to app',
                    'The email address or password provided are invalid',
                    404
                )
            }
            if (!user.authentication.isAuthenticated) {
                throw new utils.ApiError(
                    'Logging to app',
                    'An account assigned to email address provided must be firstly authenticated',
                    409
                )
            }
            const token = jwt.sign({ email, role: 'user' }, process.env.JWT_KEY)
            res.cookie('token', token, {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true,
                maxAge: utils.cookieMaxAge()
            }).send({
                success: true
            })
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    utils.validator.validateEmail(),
    utils.validator.validatePassword(true)
]
