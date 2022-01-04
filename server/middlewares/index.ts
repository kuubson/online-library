import express, { Application } from 'express'
import { Server } from 'http'
import { Server as SocketServer } from 'socket.io'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import initSocketIo from 'socketio/socketio'
import initGraphQL from 'graphql/graphql'
import initCSRF from './csrf'
import initPassport from './passport'
initPassport(passport)

import errorHandler from './errorHandler'
import checkValidation from './checkValidation'
import rateLimiter from './rateLimiter'
import jwtAuthorization from './jwtAuthorization'
import facebookAuthorization from './facebookAuthorization'
import roleAuthorization from './roleAuthorization'
import multerFile from './multerFile'
import handleMulterFile from './handleMulterFile'

const init = (app: Application, server: Server) => {
    initSocketIo(
        new SocketServer(server, {
            cors: {
                origin: 'http://localhost:3000',
                credentials: true
            }
        })
    )
    app.use(
        helmet({
            contentSecurityPolicy: false
        })
    )
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(passport.initialize())
    initGraphQL(app, passport)
    initCSRF(app)
    app.set('trust proxy', true)
}

const middlewares = {
    init,
    errorHandler,
    checkValidation,
    rateLimiter,
    jwtAuthorization,
    facebookAuthorization,
    roleAuthorization,
    multerFile,
    handleMulterFile
}

export default middlewares
