/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ApolloProvider } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { ThemeProvider } from 'styled-components/macro'

import { client } from 'gql/client'

import { persistor, store } from 'redux/store'

import 'assets/styles/index.scss'
import { theme } from 'assets/styles/theme'

import { Loader, Wrapper } from 'components/shared'

import { App } from 'components/App'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const app = document.getElementById('app')!

createRoot(app).render(
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
               <Wrapper>
                  <App />
               </Wrapper>
            </ThemeProvider>
         </ApolloProvider>
      </PersistGate>
   </Provider>
)

serviceWorkerRegistration.register({
   onUpdate: async registration => {
      await registration.unregister()
      window.location.reload()
   },
})
