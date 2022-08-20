import { ApolloServer } from 'apollo-server-express'
import { Application } from 'express'
import { PassportStatic } from 'passport'

import { schema } from 'gql/schema'

import { ApiError } from 'utils'

import { GraphQLContext } from 'types/graphql'

export const initializeGraphQL = async (app: Application, passport: PassportStatic) => {
   app.use('/graphql', (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (error, { user, role }) => {
         try {
            if (error || !user) {
               throw new ApiError(
                  'Authorization',
                  'The authentication cookie is invalid, log in again',
                  401
               )
            }

            req.user = {
               user,
               role,
            }

            next()
         } catch (error) {
            next(error)
         }
      })(req, res, next)
   })

   const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }: GraphQLContext) => ({
         req,
         res,
      }),
   })

   await apolloServer.start()

   apolloServer.applyMiddleware({
      app,
      path: '/graphql',
   })
}
