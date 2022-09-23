import jwt from 'jsonwebtoken'

import { API, ApiError, yup } from '@online-library/config'

import { JWT_KEY, TokenExpiration } from 'config'

import { Connection, User } from 'database'

import { yupValidation } from 'middlewares'

import { transporter } from 'helpers'

import { emailTemplate, hostUrl } from 'utils'

import type { Body, Route } from 'types/express'

const { validation, header, errors } = API['/api/user/auth/register'].post

const schema = yup.object({ body: validation })

export const register: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { name, email, password } = req.body

            const user = await User.findOne({ where: { email } })

            if (user) {
               throw new ApiError(header, errors[409], 409)
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

            await createdUser.createAuthentication({ activationToken }, { transaction })

            try {
               await transporter.sendMail({
                  to: email,
                  subject: `${header} in the Online Library`,
                  html: emailTemplate(
                     `${header} in the Online Library`,
                     `To activate the account click the button`,
                     'Activate account',
                     `${hostUrl(req)}/home/?activationToken=${activationToken}`
                  ),
               })
            } catch {
               throw new ApiError(header, errors[502], 502)
            }

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
