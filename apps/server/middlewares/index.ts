import express, { Application } from 'express'
import { Server } from 'http'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { Server as SocketServer } from 'socket.io'

import webpush from 'web-push'
webpush.setVapidDetails(
    `mailto:${process.env.NODEMAILER_USERNAME}`,
    process.env.REACT_APP_PUBLIC_VAPID_KEY!,
    process.env.PRIVATE_VAPID_KEY!
)

import cloudinary from 'cloudinary'
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

import paypal from 'paypal-rest-sdk'
paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID!,
    client_secret: process.env.PAYPAL_CLIENT_SECRET!
})

import { initializeCsrf } from './csrf'
import { initializeSocketIO } from 'socketio/socketio'
import { initializeGraphQL } from 'gql/server'
import { initializePassport } from './passport'

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
