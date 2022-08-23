import bcrypt from 'bcrypt'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { Connection, User } from 'database'

import { password, repeatedPassword } from 'shared'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { ApiError } from 'utils'

import type { PasswordTokendata } from 'types'
import type { Route } from 'types/express'

export const changePassword: Route = async (req, res, next) => {
   try {
      await Connection.transaction(async transaction => {
         const { password, passwordToken } = req.body

         const { email } = jwt.verify(passwordToken, JWT_KEY) as PasswordTokendata

         const user = await User.findOne({
            where: {
               email,
               passwordToken,
            },
         })

         if (!user) {
            throw new ApiError('Password recovery', 'The password recovery link is invalid', 400)
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
      if (error instanceof JsonWebTokenError) {
         if (error instanceof TokenExpiredError) {
            throw new ApiError('Password recovery', 'The password recovery link has expired', 400)
         }
         throw new ApiError('Password recovery', 'The password recovery link is invalid', 400)
      }
      next(error)
   }
}

export const validation = yupValidation({
   body: {
      password,
      repeatedPassword: repeatedPassword(),
      passwordToken: yup.string().jwt().required(),
   },
})
