import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import type { ReactChildren } from '@online-library/core'
import { client, history, persistor, store, theme } from '@online-library/core'

import { Loader } from 'components/common'

export const Providers = ({ children }: ReactChildren) => (
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <ApolloProvider client={client()}>
            <ThemeProvider theme={theme}>
               <HistoryRouter history={history}>{children}</HistoryRouter>
            </ThemeProvider>
         </ApolloProvider>
      </PersistGate>
   </Provider>
)
