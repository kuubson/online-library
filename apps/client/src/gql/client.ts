import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { API, AuthError, ConnectivityError } from 'online-library'

import { NODE_ENV } from 'config'

import { setApiFeedback, setLoading } from 'helpers'

import { defaultAxios, history, websocketUrl } from 'utils'

let timeoutId: NodeJS.Timeout | undefined

const handleOnClosed = (event: any) => {
   if (event.code === 4401) {
      client.clearStore()
   }
}

const webSocketLink = new GraphQLWsLink(
   createClient({
      url: websocketUrl,
      on: { closed: handleOnClosed },
   })
)

const customFetch = (uri: RequestInfo | URL, options: RequestInit) => {
   if (!timeoutId) {
      timeoutId = setTimeout(() => setLoading(true), 500)
   }
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
      setLoading(false)
      clearTimeout(timeoutId)
      timeoutId = undefined
      return response
   })
})

const handleError = onError(({ graphQLErrors, networkError }) => {
   setLoading(false)

   clearTimeout(timeoutId)

   timeoutId = undefined

   if (graphQLErrors) {
      const [
         {
            extensions: { exception },
         },
      ] = graphQLErrors
      setApiFeedback(exception.errorHeader, exception.errorMessage, 'Okey')
   }

   if (networkError) {
      if ('statusCode' in networkError) {
         if (networkError.statusCode === 401) {
            defaultAxios.get(API.GLOBAL.logout.url).then(() => {
               setApiFeedback(AuthError.errorHeader, AuthError.errorMessage, 'Okey')
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
