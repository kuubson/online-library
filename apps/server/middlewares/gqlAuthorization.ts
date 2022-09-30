/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Response } from 'express'
import type { PassportStatic } from 'passport'

import { AuthError, isProd } from '@online-library/config'

import type { CustomRequest } from 'types/express'

export const gqlAuthorization =
   (passport: PassportStatic) => (req: CustomRequest, res: Response, next: NextFunction) =>
      passport.authenticate(
         'jwt',
         { session: false },
         (error, { user, role }: CustomRequest['user']) => {
            // NOTE: isProd prevents auth error when running codegen script
            if (isProd) {
               if (error || !user) {
                  next(AuthError)
               }
            }

            req.user = {
               user,
               role,
            }

            next()
         }
      )(req, res, next)
