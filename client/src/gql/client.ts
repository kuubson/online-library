import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { NODE_ENV } from 'config'

import { setApiFeedback, setLoading } from 'helpers'

import { history } from 'utils'

let timeoutId: NodeJS.Timeout | undefined

const errorHandler = onError(({ graphQLErrors, networkError }) => {
   setLoading(false)

   clearTimeout(timeoutId)

   timeoutId = undefined

   if (graphQLErrors) {
      const error = graphQLErrors as GraphqlError
      if (error) {
         const errorHeader = error.exception?.errorHeader || 'Request Processing'

         const errorMessage =
            error.exception?.errorMessage || 'The server cannot temporarily process your request'

         switch (true) {
            case errorHeader === 'Request Processing': {
               return setApiFeedback(
                  'Request Processing',
                  'The server cannot temporarily process your request',
                  'Refresh the application',
                  () => NODE_ENV === 'production' && window.location.reload()
               )
            }
            default:
               setApiFeedback(errorHeader, errorMessage, 'Okey')
         }
      }
   }

   if (networkError && networkError.message.includes('401')) {
      setApiFeedback(
         'Authorization',
         'The authentication cookie is invalid, log in again',
         'Okey',
         () => history.push('/login')
      )
   }
})

const customFetch = (uri: RequestInfo | URL, options: RequestInit) => {
   !timeoutId && (timeoutId = setTimeout(() => setLoading(true), 500))
   return fetch(uri, options)
}

const handleLoader = new ApolloLink((operation, forward) => {
   return forward(operation).map(response => {
      setLoading(false)
      clearTimeout(timeoutId)
      timeoutId = undefined
      return response
   })
})

export const client = new ApolloClient({
   cache: new InMemoryCache(),
   link: ApolloLink.from([errorHandler, handleLoader, new HttpLink({ fetch: customFetch })]),
})
