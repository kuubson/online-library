import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Connection, User } from '@database'

import utils from '@utils'

export default {
    default: async (req, res, next) => {
        try {
            await Connection.transaction(async transaction => {
                const { name, email, access_token } = req.body
                const user = await User.findOne({
                    where: {
                        email
                    },
                    transaction
                })
                const token = jwt.sign({ email, role: 'user' }, process.env.JWT_KEY)
                if (user) {
                    return res
                        .cookie('token', token, {
                            secure: process.env.NODE_ENV === 'production',
                            httpOnly: true,
                            sameSite: true,
                            maxAge: utils.cookieMaxAge()
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
                    maxAge: utils.cookieMaxAge()
                }).send({
                    success: true
                })
            })
        } catch (error) {
            next(error)
        }
    },
    validation: () => [
        utils.validator.validateProperty(
            'name',
            'Type your name',
            'Name contains invalid characters'
        ),
        utils.validator.validateEmail(),
        utils.validator.validateProperty('access_token')
    ]
}
