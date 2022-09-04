import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import type { Role } from 'online-library'
import { API, ApiError, yup } from 'online-library'

import { JWT_KEY } from 'config'

import { User } from 'database'

import { yupValidation } from 'middlewares'

import { cookie } from 'utils'

import type { Body, Route } from 'types/express'

const { header, post, validation } = API.login

const schema = yup.object({ body: validation })

export const login: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { email, password } = req.body

         const user = await User.findOne({
            where: { email },
            include: [User.associations.authentication],
         })

         if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new ApiError(header, post[401], 401)
         }

         if (!user.authentication?.authenticated) {
            throw new ApiError(header, post[403], 403)
         }

         const token = jwt.sign(
            {
               email,
               role: 'user' as Role,
            },
            JWT_KEY
         )

         res.cookie('token', token, cookie(true)).send()
      } catch (error) {
         next(error)
      }
   },
]
