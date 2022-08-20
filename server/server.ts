import './config/aliases'
import { NODE_ENV } from 'config'
import 'database'
import 'dotenv/config'
import express from 'express'
import http from 'http'
import { errorHandler, initializeMiddlewares } from 'middlewares'
import path from 'path'
import { routes } from 'routes'

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
