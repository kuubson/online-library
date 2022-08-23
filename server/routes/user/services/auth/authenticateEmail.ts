import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

import { JWT_KEY } from 'config'

import { Authentication, Connection } from 'database'

import { yupValidation } from 'middlewares'

import { yup } from 'helpers'

import { ApiError } from 'utils'

import type { Route } from 'types/express'

export const authenticateEmail: Route = async (req, res, next) => {
   try {
      await Connection.transaction(async transaction => {
         const { token } = req.body

         verify(token, JWT_KEY)

         const authentication = await Authentication.findOne({ where: { token } })

         if (!authentication) {
            throw new ApiError(
               'Email address authentication',
               'The activation link is invalid',
               400
            )
         }

         if (authentication.authenticated) {
            throw new ApiError(
               'Email address authentication',
               'An account assigned to email address provided is already authenticated',
               400
            )
         }

         await authentication.update({ authenticated: true }, { transaction })

         res.send()
      })
   } catch (error) {
      if (error instanceof JsonWebTokenError) {
         if (error instanceof TokenExpiredError) {
            throw new ApiError(
               'Email address authentication',
               'The activation link has expired',
               400
            )
         }
         throw new ApiError('Email address authentication', 'The activation link is invalid', 400)
      }
      next(error)
   }
}

export const validation = yupValidation({ body: { token: yup.string().jwt() } })
