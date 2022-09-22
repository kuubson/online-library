import { verify } from 'jsonwebtoken'

import { API, ApiError, yup } from '@online-library/core'

import { JWT_KEY } from 'config'

import { Authentication, Connection } from 'database'

import { yupValidation } from 'middlewares'

import { jwt } from 'utils'

import type { Body, Route } from 'types/express'

const { validation, header, errors } = API['/api/user/auth/account'].patch

const schema = yup.object({ body: validation.shape({ activationToken: jwt }) })

export const activateAccount: Route<Body<typeof schema>> = [
   yupValidation({ schema }),
   async (req, res, next) => {
      try {
         await Connection.transaction(async transaction => {
            const { activationToken } = req.body

            verify(activationToken, JWT_KEY)

            const authentication = await Authentication.findOne({ where: { activationToken } })

            if (!authentication) {
               throw new ApiError(header, errors[409], 409)
            }

            if (authentication.authenticated) {
               throw new ApiError(header, errors[403], 403)
            }

            await authentication.update({ authenticated: true }, { transaction })

            res.send()
         })
      } catch (error) {
         next(error)
      }
   },
]
