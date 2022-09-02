import { verify } from 'jsonwebtoken'

import { API } from 'online-library'

import { JWT_KEY } from 'config'

import { User } from 'database'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { ApiError } from 'utils'

import type { PasswordTokendata } from 'types'
import type { Body, Route } from 'types/express'

const ENDPOINT = API.AUTH.checkPasswordToken

// TODO: move schema to API.ts
const schema = yup.object({ body: yup.object({ passwordToken: yup.string().jwt().required() }) })

export const checkPasswordToken: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         const { passwordToken } = req.body

         const { email } = verify(passwordToken, JWT_KEY) as PasswordTokendata

         const user = await User.findOne({
            where: {
               email,
               passwordToken,
            },
         })

         if (!user) {
            throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses['400'].description, 400)
         }

         res.send()
      } catch (error) {
         next(error)
      }
   },
]
