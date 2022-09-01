import jwt from 'jsonwebtoken'

import { Connection, User, Authentication } from 'database'

import { transporter, validator } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import { Route } from 'types/express'

export const resendEmail: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { email } = req.body
            const user = await User.findOne({
                where: {
                    email
                },
                include: [Authentication]
            })
            if (!user || !user.authentication) {
                throw new ApiError('E-mail resending', 'The email address provided is invalid', 404)
            }
            if (user.authentication.authenticated) {
                throw new ApiError(
                    'E-mail resending',
                    'An account assigned to email address provided is already authenticated',
                    409
                )
            }
            const token = jwt.sign({ email }, process.env.JWT_KEY!, { expiresIn: '24h' })
            await user.authentication.update(
                {
                    token
                },
                {
                    transaction
                }
            )
            const mailOptions = {
                to: email,
                subject: 'Account activation in the Online Library',
                html: emailTemplate(
                    'Account activation in the Online Library',
                    `To activate your account click the button`,
                    'Activate account',
                    `${baseUrl(req)}/authentication/${token}`
                )
            }
            transporter.sendMail(mailOptions, (error, info) => {
                try {
                    if (error || !info) {
                        throw new ApiError(
                            'E-mail resending',
                            'There was an unexpected problem when sending an e-mail with an activation link for your account',
                            502
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
    } catch (error) {
        next(error)
    }
}

export const validation = () => [validator.validateEmail()]
