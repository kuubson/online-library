import { ApolloProvider } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import type { ReactFC } from '@online-library/core'
import { client, getReduxSetup, theme } from '@online-library/core'

import { SERVER_NATIVE_URL } from 'config'

import { Loader } from '../../common/Loader/Loader'

const { store, persistor } = getReduxSetup(AsyncStorage)

export const Providers = ({ children }: ReactFC) => (
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <ApolloProvider client={client(SERVER_NATIVE_URL)}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
         </ApolloProvider>
      </PersistGate>
   </Provider>
)
