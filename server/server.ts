import express from 'express'
import http from 'http'
import path from 'path'

import 'dotenv/config'

import { NODE_ENV } from 'config'

import 'database'

import { errorHandler, initializeMiddlewares } from 'middlewares'

import { routes } from 'routes'

import './aliases'

const app = express()

const server = http.createServer(app)

initializeMiddlewares(app, server)

routes(app)

errorHandler(app)

const buildPath = `${NODE_ENV === 'production' ? '../../' : '../'}client/build`

app.use(express.static(path.resolve(__dirname, buildPath)))

app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, buildPath, 'index.html')))

const port = process.env.PORT || 3001

server.listen(port, () => console.log(`The server has been successfully started on port ${port}`))
