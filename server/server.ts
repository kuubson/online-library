import 'dotenv/config'

import express from 'express'
import http from 'http'
import path from 'path'

import './database/database'

import middlewares from './middlewares'

import routes from './routes/routes'

const app = express()
const server = http.createServer(app)

middlewares.init(app)

routes(app)

middlewares.errorHandler(app)

const buildPath = '../build'

app.use(express.static(path.resolve(__dirname, buildPath)))

app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, buildPath, 'index.html')))

const port = process.env.PORT || 3001

server.listen(port, () => console.log(`The server has been successfully started on port ${port}`))
