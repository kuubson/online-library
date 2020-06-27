import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import crypto from 'crypto'

import { Connection, User } from '../../../database/database'

import utils from '../../../utils'

export default {
    default: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Connection.transaction(async transaction => {
                const { name, email, password } = req.body
                const user = await User.findOne({
                    where: {
                        email
                    }
                })
                if (user) {
                    throw new utils.ApiError(
                        'Registration',
                        'User with given e-mail address already exists',
                        409
                    )
                }
                const authenticationToken = crypto.randomBytes(16).toString('hex')
                await User.create(
                    {
                        name,
                        email,
                        password
                    },
                    {
                        transaction
                    }
                )
                const mailOptions = {
                    from: `"Online Library" <${process.env.NODEMAILER_USERNAME}>`,
                    to: email,
                    subject: 'Account activation in the Online Library application',
                    html: utils.emailTemplate(
                        'Account activation in the Online Library application',
                        `To activate your account click`,
                        'Activate account',
                        `${utils.baseUrl(req)}/uwierzytelnianie/${authenticationToken}`
                    )
                }
                utils.transporter.sendMail(mailOptions, (error, info) => {
                    try {
                        if (error || !info) {
                            throw new utils.ApiError(
                                'Registration',
                                'There was an unexpected problem sending an e-mail with the activation link for your account',
                                500
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
    },
    validation: () => [
        check('name')
            .trim()
            .notEmpty()
            .withMessage('Type your name')
            .bail()
            .custom(utils.checkSanitization)
            .withMessage('Name contains invalid characters'),
        check('email')
            .trim()
            .notEmpty()
            .withMessage('Type your e-mail')
            .bail()
            .isEmail()
            .withMessage('Type proper e-mail')
            .normalizeEmail(),
        check('password')
            .trim()
            .notEmpty()
            .withMessage('Type your password')
            .bail()
            .custom(password => {
                if (!/(?=.{10,})/.test(password)) {
                    throw new Error('Password must be at least 10 characters long')
                }
                if (!/(?=.*[a-z])/.test(password)) {
                    throw new Error('Password must contain at least one small letter')
                }
                if (!/(?=.*[A-Z])/.test(password)) {
                    throw new Error('Password must contain at least one big letter')
                }
                if (!/(?=.*[0-9])/.test(password)) {
                    throw new Error('Password must contain at least one digit')
                }
                return password
            }),
        check('repeatedPassword').trim().notEmpty().withMessage('You have to type password twice')
    ]
}
