import express, { Express } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import csurf from 'csurf'
import passport from 'passport'

import initPassport from './passport'
initPassport(passport)

import errorHandler from './errorHandler'
import checkValidation from './checkValidation'
import jwtAuthorization, { IPassportData } from './jwtAuthorization'
import facebookAuthorization from './facebookAuthorization'
import roleAuthorization from './roleAuthorization'

import utils from '../utils'

import schema from '../graphql/schema'

const init = (app: Express) => {
    app.use(helmet())
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(passport.initialize())
    app.use('/graphql', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (_, { user, role }: IPassportData) => {
            if (!user) {
                return next(
                    new utils.ApiError(
                        'Authorization',
                        'The authentication cookie is invalid, log in again',
                        401
                    )
                )
            }
            req.user = {
                user,
                role
            }
            next()
        })(req, res, next)
    })
    new ApolloServer({
        schema,
        context: ({ req, res }) => ({
            res,
            user: (req.user as IPassportData).user,
            role: (req.user as IPassportData).role
        })
    }).applyMiddleware({
        app,
        path: '/graphql'
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
    jwtAuthorization,
    facebookAuthorization,
    roleAuthorization
}
