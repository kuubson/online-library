import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import jwt from 'jsonwebtoken'

import { Connection, User } from '../../../database/database'

import utils from '../../../utils'

const { JWT_KEY, NODEMAILER_USERNAME } = process.env

interface IBody {
    email: string
}

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        await Connection.transaction(async transaction => {
            const { email }: IBody = req.body
            try {
                const user = await User.findOne({
                    where: {
                        email
                    },
                    include: ['authentication'],
                    transaction
                })
                if (!user || !user.authentication) {
                    throw new utils.ApiError(
                        'Password recovery',
                        'The email address provided is invalid',
                        404
                    )
                }
                if (!user.authentication.isAuthenticated) {
                    throw new utils.ApiError(
                        'Password recovery',
                        'An account assigned to email address provided must be firstly authenticated',
                        409
                    )
                }
                const passwordToken = jwt.sign({ email }, JWT_KEY, { expiresIn: '1h' })
                await user.update(
                    {
                        passwordToken
                    },
                    {
                        transaction
                    }
                )
                const mailOptions = {
                    from: `"Online Library" <${NODEMAILER_USERNAME}>`,
                    to: email,
                    subject: 'Password recovery in the Online Library application',
                    html: utils.emailTemplate(
                        'Password recovery in the Online Library application',
                        `To change your password click the button`,
                        'Change password',
                        `${utils.baseUrl(req)}/user/password-recovery/${passwordToken}`
                    )
                }
                utils.transporter.sendMail(mailOptions, (error, info) => {
                    try {
                        if (error || !info) {
                            throw new utils.ApiError(
                                'Password recovery',
                                'There was an unexpected problem sending an e-mail with a password recovery link for your account',
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
            } catch (error) {
                next(error)
            }
        })
    },
    validation: () => [
        check('email')
            .trim()
            .notEmpty()
            .withMessage('Type your email')
            .bail()
            .isEmail()
            .withMessage('Type proper email')
            .normalizeEmail()
    ]
}
