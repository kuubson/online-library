import { ApolloProvider } from '@apollo/client'
import { StrictMode } from 'react'
import { render } from 'react-dom'
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

render(
   <StrictMode>
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
   </StrictMode>,
   document.getElementById('root')
)

serviceWorkerRegistration.register({
   onUpdate: async registration => {
      await registration.unregister()
      window.location.reload()
   },
})
