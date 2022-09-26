import express from 'express'
import http from 'http'

import { isProd } from '@online-library/config'

import 'dotenv/config'

import './config/aliases'

import { PORT } from 'config'

import 'database'

import { formatErrors, initializeMiddlewares, serveWeb } from 'middlewares'

import { router } from 'routes'

const app = express()

const server = http.createServer(app)

initializeMiddlewares(app, server)

app.use(router)

formatErrors(app)

if (isProd) {
   serveWeb(app)
}

server.listen(PORT || 3001, () => console.log(`🚀 Server has launched`))
