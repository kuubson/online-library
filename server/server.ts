import 'dotenv/config'

import express from 'express'
import http from 'http'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'

import './database/database'

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

import middlewares from './middlewares'

import routes from './routes/routes'

const app = express()
const server = http.createServer(app)

middlewares.init(app)

new ApolloServer({ resolvers, typeDefs }).applyMiddleware({ app, path: '/graphql' })

routes(app)

middlewares.errorHandler(app)

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')))

app.use(express.static(path.resolve(__dirname, '../build')))

app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, '../build', 'index.html')))

const port = process.env.PORT || 3001

server.listen(port, () => console.log(`The server has been successfully started on port ${port}`))
