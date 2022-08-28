import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { User } from 'database'

import { API, email, uncheckedPassword } from 'shared'

import { yupValidation } from 'middlewares'

import { ApiError, cookie } from 'utils'

import type { Route } from 'types/express'

export const login: Route = [
   yupValidation({
      body: {
         email,
         password: uncheckedPassword,
      },
   }),
   async (req, res, next) => {
      try {
         const { email, password } = req.body

         const user = await User.findOne({
            where: { email },
            include: [User.associations.authentication],
         })

         if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new ApiError(
               API.AUTH.login.header,
               API.AUTH.login.post.responses[401].description,
               401
            )
         }

         if (!user.authentication?.authenticated) {
            throw new ApiError(
               API.AUTH.login.header,
               API.AUTH.login.post.responses[403].description,
               403
            )
         }

         const token = jwt.sign(
            {
               email,
               role: 'user',
            },
            JWT_KEY
         )

         res.cookie('token', token, cookie(true)).send()
      } catch (error) {
         next(error)
      }
   },
]
