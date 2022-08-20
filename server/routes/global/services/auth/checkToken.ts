import jwt from 'jsonwebtoken'

import { Connection, User } from 'database'

import { validator } from 'helpers'

import { ApiError } from 'utils'

import { Route } from 'types/express'

export const checkToken: Route = async (req, res, next) => {
   await Connection.transaction(async transaction => {
      const { token } = req.cookies
      if (!token) {
         return res
            .clearCookie('token', {
               secure: process.env.NODE_ENV === 'production',
               httpOnly: true,
               sameSite: true,
            })
            .send({
               role: 'guest',
            })
      }
      return jwt.verify(token, process.env.JWT_KEY!, async (error: any, data: any) => {
         try {
            if (error) {
               if (error.message.includes('expired')) {
                  throw new ApiError(
                     'Authorization',
                     'The authentication cookie has expired, log in again',
                     401
                  )
               }
               throw new ApiError(
                  'Authorization',
                  'The authentication cookie is invalid, log in again',
                  401
               )
            }
            if (data.role === 'user') {
               const user = await User.findOne({
                  where: {
                     email: data.email,
                  },
                  transaction,
               })
               if (!user) {
                  throw new ApiError(
                     'Authorization',
                     'The authentication cookie is invalid, log in again',
                     401
                  )
               }
               res.send({
                  role: 'user',
               })
            } else {
               throw new ApiError(
                  'Authorization',
                  'The authentication cookie is invalid, log in again',
                  401
               )
            }
         } catch (error) {
            next(error)
         }
      })
   })
}

export const validation = () => [validator.validateProperty('token').optional()]
