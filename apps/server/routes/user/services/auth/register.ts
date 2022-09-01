import jwt from 'jsonwebtoken'

import { JWT_KEY, TokenExpiration } from 'config'

import { Connection, User } from 'database'

import { API } from 'shared'

import { yupValidation } from 'middlewares'

import { transporter, yup } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import type { Body, Route } from 'types/express'

const ENDPOINT = API.AUTH.register

const schema = yup.object({ body: ENDPOINT.schema })

export const register: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { name, email, password } = req.body

            const user = await User.findOne({ where: { email } })

            if (user) {
               throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses[409].description, 409)
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
                  subject: `${ENDPOINT.header} in the Online Library`,
                  html: emailTemplate(
                     `${ENDPOINT.header} in the Online Library`,
                     `To activate your account click the button`,
                     'Activate account',
                     `${baseUrl(req)}/activation/${activationToken}`
                  ),
               })
            } catch {
               throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses[502].description, 502)
            }

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
