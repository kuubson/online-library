import jwt from 'jsonwebtoken'

import { JWT_KEY, TokenExpiration } from 'config'

import { Connection, User } from 'database'

import { API, email } from 'shared'

import { yupValidation } from 'middlewares'

import { transporter } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import type { Route } from 'types/express'

export const resendActivationToken: Route = [
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
               throw new ApiError(
                  API.AUTH.resendActivationToken.header,
                  API.AUTH.resendActivationToken.post.responses[404].description,
                  404
               )
            }

            if (user.authentication.authenticated) {
               throw new ApiError(
                  API.AUTH.resendActivationToken.header,
                  API.AUTH.resendActivationToken.post.responses[403].description,
                  403
               )
            }

            const activationToken = jwt.sign({ email }, JWT_KEY, {
               expiresIn: TokenExpiration['24h'],
            })

            await user.authentication.update({ activationToken }, { transaction })

            try {
               await transporter.sendMail({
                  to: email,
                  subject: `${API.AUTH.resendActivationToken.header} in the Online Library`,
                  html: emailTemplate(
                     `${API.AUTH.resendActivationToken.header} in the Online Library`,
                     `To activate your account click the button`,
                     'Activate account',
                     `${baseUrl(req)}/activation/${activationToken}`
                  ),
               })
            } catch (error) {
               throw new ApiError(
                  API.AUTH.resendActivationToken.header,
                  API.AUTH.resendActivationToken.post.responses[502].description,
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
