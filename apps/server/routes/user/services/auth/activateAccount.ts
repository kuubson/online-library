import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

import { API } from 'online-library'

import { JWT_KEY } from 'config'

import { Authentication, Connection } from 'database'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { ApiError } from 'utils'

import type { Body, Route } from 'types/express'

const ENDPOINT = API.AUTH.activateAccount

const schema = yup.object({ body: yup.object({ activationToken: yup.string().jwt().required() }) })

export const activateAccount: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { activationToken } = req.body

            verify(activationToken, JWT_KEY)

            const authentication = await Authentication.findOne({ where: { activationToken } })

            if (!authentication) {
               throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses[409].description, 409)
            }

            if (authentication.authenticated) {
               throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses[403].description, 403)
            }

            await authentication.update({ authenticated: true }, { transaction })

            res.send()
         })
      } catch (error) {
         if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
               throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses[401].description, 401)
            }
            throw new ApiError(ENDPOINT.header, ENDPOINT.post.responses[400].description, 400)
         }
         next(error)
      }
   },
]
