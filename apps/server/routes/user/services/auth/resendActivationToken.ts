import jwt from 'jsonwebtoken'

import { API, ApiError, CLIENT_URL, yup } from '@online-library/config'

import { JWT_KEY, TokenExpiration } from 'config'

import { Connection, User } from 'database'

import { yupValidation } from 'middlewares'

import { transporter } from 'helpers'

import { emailTemplate } from 'utils'

import type { Body, Route } from 'types/express'

const { validation, header, responses } = API['/api/user/auth/activation-token'].post

const schema = yup.object({ body: validation })

export const resendActivationToken: Route<Body<typeof schema>> = [
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
               throw new ApiError(header, responses[404], 404)
            }

            if (user.authentication.authenticated) {
               throw new ApiError(header, responses[403], 403)
            }

            const activationToken = jwt.sign({ email }, JWT_KEY, {
               expiresIn: TokenExpiration['24h'],
            })

            await user.authentication.update({ activationToken }, { transaction })

            try {
               await transporter.sendMail({
                  to: email,
                  subject: `${header} in the Online Library`,
                  html: emailTemplate(
                     `${header} in the Online Library`,
                     `To activate the account click the button`,
                     'Activate account',
                     `${CLIENT_URL}/?activationToken=${activationToken}`
                  ),
               })
            } catch (error) {
               throw new ApiError(header, responses[502], 502)
            }

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
