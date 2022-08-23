import jwt from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { Connection, User } from 'database'

import { email } from 'shared'

import { yupValidation } from 'middlewares'

import { transporter } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import type { Route } from 'types/express'

export const recoverPassword: Route = async (req, res, next) => {
   try {
      await Connection.transaction(async transaction => {
         const { email } = req.body

         const user = await User.findOne({
            where: { email },
            include: [User.associations.authentication],
         })

         if (!user || !user.authentication) {
            throw new ApiError('Password recovery', 'The email address provided is invalid', 404)
         }

         if (!user.authentication.authenticated) {
            throw new ApiError(
               'Password recovery',
               'An account assigned to email address provided must be firstly authenticated',
               409
            )
         }

         const passwordToken = jwt.sign({ email }, JWT_KEY, { expiresIn: '1h' })

         await user.update({ passwordToken }, { transaction })

         const mailOptions = {
            to: email,
            subject: 'Password recovery in the Online Library',
            html: emailTemplate(
               'Password recovery in the Online Library',
               `To change your password click the button`,
               'Change password',
               `${baseUrl(req)}/password-recovery/${passwordToken}`
            ),
         }

         transporter.sendMail(mailOptions, (error, info) => {
            try {
               if (error || !info) {
                  throw new ApiError(
                     'Password recovery',
                     'There was an unexpected problem when sending an e-mail with a password recovery link for your account',
                     502
                  )
               }
               res.send()
            } catch (error) {
               next(error)
            }
         })
      })
   } catch (error) {
      next(error)
   }
}

export const validation = yupValidation({ body: { email } })
