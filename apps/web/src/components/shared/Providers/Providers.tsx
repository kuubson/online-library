import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import type { ReactFC } from '@online-library/core'
import { client, persistor, store, theme } from '@online-library/core'

import { Loader } from 'components/common'

// TODO: move to core as Providers for RN is almost the same
export const Providers = ({ children }: ReactFC) => (
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <ApolloProvider client={client()}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
         </ApolloProvider>
      </PersistGate>
   </Provider>
)
