import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { Authentication, Connection } from 'database'

import { API } from 'shared'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { ApiError } from 'utils'

import type { Route } from 'types/express'

export const activateAccount: Route = [
   yupValidation({ body: { activationToken: yup.string().jwt() } }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { activationToken } = req.body

            verify(activationToken, JWT_KEY)

            const authentication = await Authentication.findOne({ where: { activationToken } })

            if (!authentication) {
               throw new ApiError(
                  API.AUTH.activateAccount.header,
                  API.AUTH.activateAccount.post.responses[409].description,
                  409
               )
            }

            if (authentication.authenticated) {
               throw new ApiError(
                  API.AUTH.activateAccount.header,
                  API.AUTH.activateAccount.post.responses[403].description,
                  403
               )
            }

            await authentication.update({ authenticated: true }, { transaction })

            res.send()
         })
      } catch (error) {
         if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
               throw new ApiError(
                  API.AUTH.activateAccount.header,
                  API.AUTH.activateAccount.post.responses[401].description,
                  401
               )
            }
            throw new ApiError(
               API.AUTH.activateAccount.header,
               API.AUTH.activateAccount.post.responses[400].description,
               400
            )
         }
         next(error)
      }
   },
]
