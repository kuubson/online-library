import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

import utils from 'utils'

export const cache = new InMemoryCache()

const errorHandler = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        const [{ extensions }] = graphQLErrors
        if (extensions) {
            const errorHeader = extensions.exception.errorHeader || 'Request Processing'
            const errorMessage =
                extensions.exception.errorMessage ||
                'The server cannot temporarily process your request'
            if (errorHeader === 'Request Processing') {
                utils.setFeedbackData(
                    'Request Processing',
                    'The server cannot temporarily process your request',
                    'Refresh the application',
                    () => process.env.NODE_ENV === 'production' && window.location.reload()
                )
            } else {
                utils.setFeedbackData(errorHeader, errorMessage)
            }
        }
    }
})

export default new ApolloClient({
    cache,
    link: ApolloLink.from([
        errorHandler,
        new HttpLink({
            uri: `${document.location.protocol}//${document.location.host}/graphql`
        })
    ])
})
