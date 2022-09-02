import jwt from 'jsonwebtoken'

import { API } from 'online-library'

import { JWT_KEY, TokenExpiration } from 'config'

import { Connection, User } from 'database'

import { yupValidation } from 'middlewares'

import { transporter, yup } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import type { Body, Route } from 'types/express'

const ENDPOINT = API.AUTH.recoverPassword

const schema = yup.object({ body: ENDPOINT.schema })

export const recoverPassword: Route<Body<typeof schema>> = [
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
               throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses['404'].description, 404)
            }

            if (!user.authentication.authenticated) {
               throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses['409'].description, 409)
            }

            const passwordToken = jwt.sign({ email }, JWT_KEY, { expiresIn: TokenExpiration['1h'] })

            await user.update({ passwordToken }, { transaction })

            try {
               await transporter.sendMail({
                  to: email,
                  subject: 'Password recovery in the Online Library',
                  html: emailTemplate(
                     'Password recovery in the Online Library',
                     `To change your password click the button`,
                     'Change password',
                     `${baseUrl(req)}/password-recovery/${passwordToken}`
                  ),
               })
            } catch (error) {
               throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses['502'].description, 502)
            }

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
