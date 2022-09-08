import {
   ApolloServerPluginDrainHttpServer,
   ApolloServerPluginLandingPageDisabled,
   ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import type { Application } from 'express'
import { PubSub } from 'graphql-subscriptions'
import { useServer } from 'graphql-ws/lib/use/ws'
import type { Server } from 'http'
import { verify } from 'jsonwebtoken'
import type { PassportStatic } from 'passport'
import { WebSocketServer } from 'ws'

import { CODEGEN, JWT_KEY, NODE_ENV } from 'config'

import { schema } from 'gql/schema'

import { gqlAuthorization } from 'middlewares'

import { getCookie } from 'helpers'

import type { AuthTokenData, GraphqlContext } from 'types'

export const initializeGraphQL = async (
   app: Application,
   server: Server,
   passport: PassportStatic
) => {
   if (!CODEGEN) {
      app.use('/graphql', (...args) => gqlAuthorization(passport)(...args))
   }

   const pubsub = new PubSub()

   const wsServer = new WebSocketServer({
      server,
      path: '/graphql',
   })

   const serverCleanup = useServer(
      {
         schema,
         context: () => ({ pubsub }),
         onConnect: async ({ extra }) => {
            try {
               const authToken = getCookie(extra.request.headers.cookie, 'authToken')
               verify(authToken, JWT_KEY) as AuthTokenData
            } catch (error) {
               extra.socket.close(4401)
            }
         },
      },
      wsServer
   )

   const apolloServer = new ApolloServer({
      schema,
      plugins: [
         ApolloServerPluginDrainHttpServer({ httpServer: server }),
         NODE_ENV !== 'production'
            ? ApolloServerPluginLandingPageLocalDefault({ embed: true })
            : ApolloServerPluginLandingPageDisabled(),
         {
            async serverWillStart() {
               return {
                  async drainServer() {
                     await serverCleanup.dispose()
                  },
               }
            },
         },
      ],
      context: ({ req, res }: GraphqlContext) => ({
         req,
         res,
      }),
      csrfPrevention: true,
      persistedQueries: false,
   })

   await apolloServer.start()

   apolloServer.applyMiddleware({
      app,
      path: '/graphql',
   })
}
