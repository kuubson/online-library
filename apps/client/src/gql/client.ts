import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import type { CloseEvent } from 'ws'

import { API, AuthError, ConnectivityError, GRAPHQL_WS_CLOSE_STATUS } from '@online-library/tools'

import { NODE_ENV } from 'config'

import { setApiFeedback } from 'helpers'

import { debounceLoader, defaultAxios, history, resetLoader, websocketUrl } from 'utils'

import type { GraphqlError } from 'types'

const webSocketLink = new GraphQLWsLink(
   createClient({
      url: websocketUrl,
      on: {
         closed: (event: CloseEvent | unknown) => {
            if ((event as CloseEvent).code === GRAPHQL_WS_CLOSE_STATUS) {
               client.clearStore()
            }
         },
      },
   })
)

const customFetch = (uri: RequestInfo | URL, options: RequestInit) => {
   debounceLoader()
   return fetch(uri, options)
}

const httpLink = new HttpLink({
   uri: '/graphql',
   fetch: customFetch,
})

const splitLink = split(
   ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
   },
   webSocketLink,
   httpLink
)

const handleLoader = new ApolloLink((operation, forward) => {
   return forward(operation).map(response => {
      resetLoader()
      return response
   })
})

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
               setApiFeedback(AuthError.errorHeader, AuthError.errorMessage)
               history.push('/login')
            })
         }
      } else {
         setApiFeedback(
            ConnectivityError.errorHeader,
            ConnectivityError.errorMessage,
            'Okey',
            () => NODE_ENV === 'production' && window.location.reload()
         )
      }
   }
})

export const client = new ApolloClient({
   link: ApolloLink.from([handleLoader, handleError, splitLink]),
   cache: new InMemoryCache(),
})
