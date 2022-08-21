import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { User } from 'database'

import { validator } from 'helpers'

import { ApiError, cookie } from 'utils'

import type { Route } from 'types/express'

export const login: Route = async (req, res, next) => {
   try {
      const { email, password } = req.body

      const user = await User.findOne({
         where: { email },
         include: [User.associations.authentication],
      })

      if (!user || !bcrypt.compareSync(password, user.password)) {
         throw new ApiError(
            'Logging to app',
            'The email address or password provided are invalid',
            404
         )
      }

      if (!user.authentication?.authenticated) {
         throw new ApiError(
            'Logging to app',
            'An account assigned to email address provided must be firstly authenticated',
            409
         )
      }

      const token = jwt.sign(
         {
            email,
            role: 'user',
         },
         JWT_KEY
      )

      res.cookie('token', token, cookie(true)).send({ success: true })
   } catch (error) {
      next(error)
   }
}

export const validation = () => [validator.validateEmail(), validator.validatePassword(true)]
