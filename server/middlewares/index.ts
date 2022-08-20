import cloudinary from 'cloudinary'
import cookieParser from 'cookie-parser'
import express, { Application } from 'express'
import { Server } from 'http'
import passport from 'passport'
import paypal from 'paypal-rest-sdk'
import { Server as SocketServer } from 'socket.io'
import { initializeSocketIO } from 'socketio/socketio'
import webpush from 'web-push'

import { initializeGraphQL } from 'gql/server'

import { initializeCsrf } from './csrf'
import { initializePassport } from './passport'

webpush.setVapidDetails(
   `mailto:${process.env.NODEMAILER_USERNAME}`,
   process.env.REACT_APP_PUBLIC_VAPID_KEY!,
   process.env.PRIVATE_VAPID_KEY!
)

cloudinary.v2.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
})

paypal.configure({
   mode: 'sandbox',
   client_id: process.env.PAYPAL_CLIENT_ID!,
   client_secret: process.env.PAYPAL_CLIENT_SECRET!,
})

initializePassport(passport)

export const initializeMiddlewares = (app: Application, server: Server) => {
   app.use(express.json({ limit: '200kb' }))
   app.use(express.urlencoded({ extended: true, limit: '200kb' }))
   app.use(cookieParser())
   app.use(passport.initialize())
   initializeCsrf(app)
   initializeSocketIO(new SocketServer(server))
   initializeGraphQL(app, passport)
}

export { errorHandler } from './errorHandler'
export { checkValidation } from './checkValidation'
export { rateLimiter } from './rateLimiter'
export { jwtAuthorization } from './jwtAuthorization'
export { facebookAuthorization } from './facebookAuthorization'
export { roleAuthorization } from './roleAuthorization'
export { multerFile } from './multerFile'
export { handleMulterFile } from './handleMulterFile'
export { unless } from './unless'
