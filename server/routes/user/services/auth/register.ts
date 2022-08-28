import jwt from 'jsonwebtoken'

import { JWT_KEY, TokenExpiration } from 'config'

import { Connection, User } from 'database'

import { API, email, password, repeatedPassword, string } from 'shared'

import { yupValidation } from 'middlewares'

import { transporter } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import type { Route } from 'types/express'

export const register: Route = [
   yupValidation({
      body: {
         name: string,
         email,
         password,
         repeatedPassword: repeatedPassword(),
      },
   }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { name, email, password } = req.body

            const user = await User.findOne({ where: { email } })

            if (user) {
               throw new ApiError(
                  API.AUTH.register.header,
                  API.AUTH.register.post.responses[409].description,
                  409
               )
            }

            const activationToken = jwt.sign({ email }, JWT_KEY, {
               expiresIn: TokenExpiration['24h'],
            })

            const createdUser = await User.create(
               {
                  name,
                  email,
                  password,
               },
               { transaction }
            )

            await createdUser.createAuthentication({ activationToken })

            try {
               await transporter.sendMail({
                  to: email,
                  subject: `${API.AUTH.register.header} in the Online Library`,
                  html: emailTemplate(
                     `${API.AUTH.register.header} in the Online Library`,
                     `To activate your account click the button`,
                     'Activate account',
                     `${baseUrl(req)}/authentication/${activationToken}`
                  ),
               })
            } catch {
               throw new ApiError(
                  API.AUTH.register.header,
                  API.AUTH.register.post.responses[502].description,
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
