import cloudinary from 'cloudinary'
import cookieParser from 'cookie-parser'
import type { Application } from 'express'
import express from 'express'
import type { Server } from 'http'
import passport from 'passport'
import path from 'path'
import paypal from 'paypal-rest-sdk'
import { Server as SocketServer } from 'socket.io'
import { initializeSocketIO } from 'socketio/socketio'
import webpush from 'web-push'

import {
   CLOUDINARY_API_KEY,
   CLOUDINARY_API_SECRET,
   CLOUDINARY_NAME,
   NODEMAILER_USERNAME,
   NODE_ENV,
   PAYPAL_CLIENT_ID,
   PAYPAL_CLIENT_SECRET,
   PRIVATE_VAPID_KEY,
   REACT_APP_PUBLIC_VAPID_KEY,
} from 'config'

import { initializeGraphQL } from 'gql/server'

import { initializeCsrf } from './csrf'
import { initializePassport } from './passport'
import { initializeSwagger } from './swagger'

webpush.setVapidDetails(
   `mailto:${NODEMAILER_USERNAME}`,
   REACT_APP_PUBLIC_VAPID_KEY,
   PRIVATE_VAPID_KEY
)

cloudinary.v2.config({
   cloud_name: CLOUDINARY_NAME,
   api_key: CLOUDINARY_API_KEY,
   api_secret: CLOUDINARY_API_SECRET,
})

paypal.configure({
   mode: 'sandbox',
   client_id: PAYPAL_CLIENT_ID,
   client_secret: PAYPAL_CLIENT_SECRET,
})

initializePassport(passport)

export const initializeMiddlewares = (app: Application, server: Server) => {
   app.use(express.json({ limit: '200kb' }))

   app.use(
      express.urlencoded({
         extended: true,
         limit: '200kb',
      })
   )

   app.use(cookieParser())

   app.use(passport.initialize())

   initializeCsrf(app)

   initializeSocketIO(new SocketServer(server))

   initializeGraphQL(app, server, passport)

   if (NODE_ENV === 'development') {
      initializeSwagger(app)
   }

   if (NODE_ENV === 'production') {
      const buildPath = '../../../../client/build'

      app.use(express.static(path.resolve(__dirname, buildPath)))

      app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, buildPath, 'index.html')))
   }
}

export { errorHandler } from './errorHandler'
export { facebookAuthorization } from './facebookAuthorization'
export { handleMulterFile } from './handleMulterFile'
export { jwtAuthorization } from './jwtAuthorization'
export { multerFile } from './multerFile'
export { rateLimiter } from './rateLimiter'
export { roleAuthorization } from './roleAuthorization'
export { unless } from './unless'
export { yupValidation } from './yupValidation'
