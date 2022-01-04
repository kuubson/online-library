import jwt from 'jsonwebtoken'

import { Connection, User, Authentication } from 'database/database'

import utils from 'utils'

import { Route } from 'types/global'

const recoverPassword: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { email } = req.body
            const user = await User.findOne({
                where: {
                    email
                },
                include: [Authentication],
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
            const passwordToken = jwt.sign({ email }, process.env.JWT_KEY!, { expiresIn: '1h' })
            await user.update(
                {
                    passwordToken
                },
                {
                    transaction
                }
            )
            const mailOptions = {
                from: `"Online Library" <${process.env.NODEMAILER_USERNAME}>`,
                to: email,
                subject: 'Password recovery in the Online Library',
                html: utils.emailTemplate(
                    'Password recovery in the Online Library',
                    `To change your password click the button`,
                    'Change password',
                    `${utils.baseUrl(req)}/password-recovery/${passwordToken}`
                )
            }
            utils.transporter.sendMail(mailOptions, (error, info) => {
                try {
                    if (error || !info) {
                        throw new utils.ApiError(
                            'Password recovery',
                            'There was an unexpected problem when sending an e-mail with a password recovery link for your account',
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

export const validation = () => [utils.validator.validateEmail()]

export default recoverPassword
