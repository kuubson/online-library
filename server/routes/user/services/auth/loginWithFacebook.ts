import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { Connection, User } from 'database'

import { email, string } from 'shared'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { cookie } from 'utils'

import type { Body, Route } from 'types/express'

const schema = yup.object({
   body: yup.object({
      name: string,
      email,
      access_token: string,
   }),
})

export const loginWithFacebook: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { name, email, access_token } = req.body

            const user = await User.findOne({ where: { email } })

            const token = jwt.sign(
               {
                  email,
                  role: 'user',
               },
               JWT_KEY
            )

            if (user) {
               return res.cookie('token', token, cookie(true)).send()
            }

            await User.create(
               {
                  name,
                  email,
                  password: bcrypt.hashSync(access_token, 11),
               },
               { transaction }
            )

            res.cookie('token', token, cookie(true)).send()
         })
      } catch (error) {
         next(error)
      }
   },
]
