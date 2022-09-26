import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import { ReactChildren, client, persistor, store, theme } from '@online-library/core'

import { SERVER_URL } from 'config'

import { Loader } from 'components/common'

export const Providers = ({ children }: ReactChildren) => (
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <ApolloProvider client={client(SERVER_URL)}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
         </ApolloProvider>
      </PersistGate>
   </Provider>
)
