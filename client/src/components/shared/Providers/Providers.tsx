import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components/macro'

import { client } from 'gql/client'

import { persistor, store } from 'redux/store'

import { theme } from 'styles'
import 'styles/index.scss'

import { Loader } from 'components/shared'

import { history } from 'utils'

type ProvidersProps = {
   children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => (
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
               <HistoryRouter history={history}>{children}</HistoryRouter>
            </ThemeProvider>
         </ApolloProvider>
      </PersistGate>
   </Provider>
)
