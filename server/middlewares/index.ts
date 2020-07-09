import express, { Express } from 'express'
import http from 'http'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import csurf from 'csurf'
import passport from 'passport'

import initPassport from './passport'
initPassport(passport)

import errorHandler from './errorHandler'
import checkValidation from './checkValidation'
import facebookAuthorization from './facebookAuthorization'

import utils from '../utils'

const init = (app: Express, server?: http.Server) => {
    app.use(helmet())
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(passport.initialize())
    app.use('/graphql', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (_, { user }) => {
            if (!user) {
                return next(
                    new utils.ApiError(
                        'Authorization',
                        'The authentication cookie is invalid, log in again',
                        401
                    )
                )
            }
            req.user = user
            next()
        })(req, res, next)
    })
    app.use(
        csurf({
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        })
    )
    app.use((req, res, next) => {
        res.cookie('XSRF-TOKEN', req.csrfToken(), {
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        next()
    })
    app.set('trust proxy', true)
}

export default {
    init,
    errorHandler,
    checkValidation,
    facebookAuthorization
}
