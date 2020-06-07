import express, { Express } from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import csurf from 'csurf'

import errorHandler from './errorHandler'

const init = (app: Express, server?: http.Server) => {
    app.use(helmet())
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
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
    errorHandler
}
