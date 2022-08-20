import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { setApiFeedback, setLoading } from 'helpers'

import { history } from 'utils'

let timeoutId: any

const errorHandler = onError(({ graphQLErrors, networkError }) => {
   setLoading(false)
   clearTimeout(timeoutId)
   timeoutId = undefined
   if (graphQLErrors) {
      const [{ extensions }] = graphQLErrors
      if (extensions) {
         const errorHeader = (extensions as any).exception.errorHeader || 'Request Processing'
         const errorMessage =
            (extensions as any).exception.errorMessage ||
            'The server cannot temporarily process your request'
         switch (true) {
            case errorHeader === 'Request Processing':
               setApiFeedback(
                  'Request Processing',
                  'The server cannot temporarily process your request',
                  'Refresh the application',
                  () => process.env.NODE_ENV === 'production' && window.location.reload()
               )
               break
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

const customFetch = (uri: any, options: any) => {
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
   link: ApolloLink.from([
      errorHandler,
      handleLoader,
      new HttpLink({
         fetch: customFetch,
      }),
   ]),
})
