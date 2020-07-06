import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const cache = new InMemoryCache()

export default new ApolloClient({
    cache,
    link: new HttpLink({ uri: `${document.location.protocol}//${document.location.host}/graphql` })
})
