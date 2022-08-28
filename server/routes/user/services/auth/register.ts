import jwt from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { Connection, User } from 'database'

import { email, getEndpointInfo, password, repeatedPassword, string } from 'shared'

import { yupValidation } from 'middlewares'

import { transporter } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import type { Route } from 'types/express'

const {
   post: { responses },
} = getEndpointInfo('/api/user/auth/register')

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
               throw new ApiError('Account registration', responses[409].description, 409)
            }

            const token = jwt.sign({ email }, JWT_KEY, { expiresIn: '24h' })

            const createdUser = await User.create(
               {
                  name,
                  email,
                  password,
               },
               { transaction }
            )

            await createdUser.createAuthentication({ token })

            const mailOptions = {
               to: email,
               subject: 'Account activation in the Online Library',
               html: emailTemplate(
                  'Account activation in the Online Library',
                  `To activate your account click the button`,
                  'Activate account',
                  `${baseUrl(req)}/authentication/${token}`
               ),
            }

            transporter.sendMail(mailOptions, (error, info) => {
               try {
                  if (error || !info) {
                     throw new ApiError('Account registration', responses[522].description, 502)
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
   },
]
