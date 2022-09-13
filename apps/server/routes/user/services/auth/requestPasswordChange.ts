import jwt from 'jsonwebtoken'

import { API, ApiError, yup } from '@online-library/tools'

import { JWT_KEY, TokenExpiration } from 'config'

import { Connection, User } from 'database'

import { yupValidation } from 'middlewares'

import { transporter } from 'helpers'

import { baseUrl, emailTemplate } from 'utils'

import type { Body, Route } from 'types/express'

const { validation, header, errors } = API['/api/user/auth/password'].post

const schema = yup.object({ body: validation })

export const requestPasswordChange: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { email } = req.body

            const user = await User.findOne({
               where: { email },
               include: [User.associations.authentication],
            })

            if (!user || !user.authentication) {
               throw new ApiError(header, errors[404], 404)
            }

            if (!user.authentication.authenticated) {
               throw new ApiError(header, errors[409], 409)
            }

            const passwordToken = jwt.sign({ email }, JWT_KEY, { expiresIn: TokenExpiration['1h'] })

            await user.update({ passwordToken }, { transaction })

            try {
               await transporter.sendMail({
                  to: email,
                  subject: `${header} in the Online Library`,
                  html: emailTemplate(
                     `${header} in the Online Library`,
                     `To change the password click the button`,
                     'Change password',
                     `${baseUrl(req)}/password-recovery/${passwordToken}`
                  ),
               })
            } catch (error) {
               throw new ApiError(header, errors[502], 502)
            }

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
