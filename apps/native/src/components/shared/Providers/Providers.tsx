import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import type { ReactChildren } from '@online-library/core'
import { client, persistor, store, theme } from '@online-library/core'

import { SERVER_NATIVE_URL } from 'config'

import { Loader } from '../../common/Loader/Loader'

export const Providers = ({ children }: ReactChildren) => (
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <ApolloProvider client={client(SERVER_NATIVE_URL)}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
         </ApolloProvider>
      </PersistGate>
   </Provider>
)
