import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import type { CloseEvent } from 'ws'

import {
   API,
   AuthError,
   ConnectivityError,
   GQL_URL,
   GRAPHQL_WS_CLOSE_STATUS,
   isProd,
   isProdWeb,
   isWeb,
} from '@online-library/config'

import { debounceLoader, resetLoader, setApiFeedback, setRole } from 'helpers'

import { defaultAxios, history } from 'utils'

import type { GraphqlError } from 'types'

const webSocketLink = (SERVER_URL?: string) =>
   new GraphQLWsLink(
      createClient({
         url: isProd || isWeb ? GQL_URL : `${SERVER_URL?.replace('http', 'ws')}/graphql`,
         on: {
            closed: (event: CloseEvent | unknown) => {
               if ((event as CloseEvent).code === GRAPHQL_WS_CLOSE_STATUS) {
                  client(SERVER_URL).clearStore()
               }
            },
         },
      })
   )

const customFetch = (uri: RequestInfo | string, options: RequestInit) => {
   debounceLoader()
   return fetch(uri, options)
}

const httpLink = (SERVER_URL?: string) =>
   new HttpLink({
      uri: isWeb ? '/graphql' : `${SERVER_URL}/graphql`,
      fetch: customFetch,
   })

const splitLink = (SERVER_URL?: string) =>
   split(
      ({ query }) => {
         const definition = getMainDefinition(query)
         return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
      },
      webSocketLink(SERVER_URL),
      httpLink(SERVER_URL)
   )

const handleLoader = new ApolloLink((operation, forward) =>
   forward(operation).map(response => {
      resetLoader()
      return response
   })
)

const handleError = onError(({ graphQLErrors, networkError }) => {
   resetLoader()

   if (graphQLErrors) {
      const [{ extensions }] = graphQLErrors

      const exception = extensions?.exception as GraphqlError['exception']

      setApiFeedback(
         exception?.errorHeader || ConnectivityError.errorHeader,
         exception?.errorMessage || ConnectivityError.errorMessage
      )
   }

   if (networkError) {
      if ('statusCode' in networkError) {
         if (networkError.statusCode === 401) {
            const { request } = API['/api/logout'].get
            defaultAxios(request).then(() => {
               setRole('guest')

               setApiFeedback(AuthError.errorHeader, AuthError.errorMessage)

               if (isWeb) {
                  history.push('/login')
               }
            })
         }
      } else {
         setApiFeedback(
            ConnectivityError.errorHeader,
            ConnectivityError.errorMessage,
            'Refresh the app',
            () => isProdWeb && window.location.reload()
         )
      }
   }
})

export const client = (SERVER_URL?: string) =>
   new ApolloClient({
      link: ApolloLink.from([handleLoader, handleError, splitLink(SERVER_URL)]),
      cache: new InMemoryCache(),
   })
