import 'dotenv/config'
import './aliases'

import express from 'express'
import http from 'http'
import path from 'path'
import Bundler from 'parcel-bundler'

import '@database'

import middlewares from '@middlewares'

import routes from '@routes'

const app = express()
const server = http.createServer(app)

const bundler = new Bundler('src/index.html')

middlewares.init(app)

middlewares.errorHandler(app)

routes(app)

if (process.env.NODE_ENV === 'development') {
    app.use(bundler.middleware())
} else {
    const buildPath = '../dist'
    app.use(express.static(path.resolve(__dirname, buildPath)))
    app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, buildPath, 'index.html')))
}

const port = process.env.PORT || 3001

server.listen(port, () => console.log(`The server has been successfully started on port ${port}`))
