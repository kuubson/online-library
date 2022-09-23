import bcrypt from 'bcrypt'
import { verify } from 'jsonwebtoken'

import { API, ApiError, yup } from '@online-library/config'

import { JWT_KEY } from 'config'

import { Connection, User } from 'database'

import { yupValidation } from 'middlewares'

import { jwt } from 'utils'

import type { PasswordTokenData } from 'types'
import type { Body, Route } from 'types/express'

const { validation, header, errors } = API['/api/user/auth/password'].patch

const schema = yup.object({ body: validation.shape({ passwordToken: jwt }) })

export const changePassword: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { password, passwordToken } = req.body

            const { email } = verify(passwordToken, JWT_KEY) as PasswordTokenData

            const user = await User.findOne({
               where: {
                  email,
                  passwordToken,
               },
            })

            if (!user) {
               throw new ApiError(header, errors[400], 400)
            }

            await user.update(
               {
                  password: bcrypt.hashSync(password, 11),
                  passwordToken: null,
               },
               { transaction }
            )

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
