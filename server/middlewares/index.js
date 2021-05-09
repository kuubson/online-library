import express from 'express'
import io from 'socket.io'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import csurf from 'csurf'
import passport from 'passport'

import initSocketIo from '../socketio/socketio'
import initPassport from './passport'
initPassport(passport)

import errorHandler from './errorHandler'
import checkValidation from './checkValidation'
import jwtAuthorization from './jwtAuthorization'
import facebookAuthorization from './facebookAuthorization'

import utils from '@utils'

const init = (app, server) => {
    initSocketIo(io(server))
    app.use(
        helmet({
            contentSecurityPolicy: false
        })
    )
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(passport.initialize())
    app.use(
        csurf({
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true,
                maxAge: utils.cookieMaxAge()
            }
        })
    )
    app.use((req, res, next) => {
        res.cookie('XSRF-TOKEN', req.csrfToken(), {
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
            maxAge: utils.cookieMaxAge()
        })
        next()
    })
    app.set('trust proxy', true)
}

export default {
    init,
    errorHandler,
    checkValidation,
    jwtAuthorization,
    facebookAuthorization
}
