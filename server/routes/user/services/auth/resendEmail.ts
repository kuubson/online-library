import jwt from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { Connection, User } from 'database'

import { email } from 'shared'

import { yupValidation } from 'middlewares'

import { transporter } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import type { Route } from 'types/express'

export const resendEmail: Route = [
   yupValidation({ body: { email } }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { email } = req.body

            const user = await User.findOne({
               where: { email },
               include: [User.associations.authentication],
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

            const token = jwt.sign({ email }, JWT_KEY, { expiresIn: '24h' })

            await user.authentication.update({ token }, { transaction })

            try {
               await transporter.sendMail({
                  to: email,
                  subject: 'Account activation in the Online Library',
                  html: emailTemplate(
                     'Account activation in the Online Library',
                     `To activate your account click the button`,
                     'Activate account',
                     `${baseUrl(req)}/authentication/${token}`
                  ),
               })
            } catch (error) {
               throw new ApiError(
                  'E-mail resending',
                  'There was an unexpected problem when sending an e-mail with an activation link for your account',
                  502
               )
            }

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
