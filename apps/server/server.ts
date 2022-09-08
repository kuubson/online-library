import express from 'express'
import http from 'http'

import 'dotenv/config'

import './config/aliases'

import { NODE_ENV, PORT } from 'config'

import 'database'

import { formatErrors, initializeMiddlewares, serveClient } from 'middlewares'

import { router } from 'routes'

const app = express()

const server = http.createServer(app)

initializeMiddlewares(app, server)

app.use(router)

formatErrors(app)

if (NODE_ENV === 'production') {
   serveClient(app)
}

server.listen(PORT || 3001, () => console.log(`🚀 Server has launched`))
