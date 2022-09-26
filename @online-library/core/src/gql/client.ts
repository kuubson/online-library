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
   GRAPHQL_WS_CLOSE_STATUS,
   isProdWeb,
   isWeb,
   websocketUrl,
} from '@online-library/config'

import { debounceLoader, resetLoader, setApiFeedback, setRole } from 'helpers'

import { defaultAxios, history } from 'utils'

import type { GraphqlError } from 'types'

const webSocketLink = new GraphQLWsLink(
   createClient({
      url: websocketUrl, // TODO: fix for rn
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
   uri: isWeb ? '/graphql' : 'http://192.168.1.11:3001/graphql',
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

export const client = new ApolloClient({
   link: ApolloLink.from([handleLoader, handleError, splitLink]),
   cache: new InMemoryCache(),
})
