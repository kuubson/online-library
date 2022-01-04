import { Application, Response } from 'express'
import { PassportStatic } from 'passport'
import { ApolloServer } from 'apollo-server-express'

import utils from 'utils'

import schema from 'graphql/schema'

import { GraphQLRequest } from 'types/global'

const graphql = async (app: Application, passport: PassportStatic) => {
    app.use('/graphql', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (_, { user, role }) => {
            try {
                if (!user) {
                    throw new utils.ApiError(
                        'Authorization',
                        'The authentication cookie is invalid, log in again',
                        401
                    )
                }
                req.user = {
                    user,
                    role
                }
                next()
            } catch (error) {
                next(error)
            }
        })(req, res, next)
    })
    const server = new ApolloServer({
        schema,
        context: ({ req, res }: { req: GraphQLRequest; res: Response }) => ({
            res,
            user: req.user.user,
            role: req.user.role
        }),
        introspection: process.env.NODE_ENV === 'development'
    })
    await server.start()
    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: {
            origin: 'http://localhost:3000',
            credentials: true
        }
    })
}

export default graphql
