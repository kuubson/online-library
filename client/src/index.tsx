import { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import { store, persistor } from 'redux/store'

import { client } from 'gql/client'

import { theme } from 'assets/styles/theme'
import 'assets/styles/index.scss'

import Wrapper from 'components/shared/Wrapper/Wrapper'
import Loader from 'components/shared/Loader/Loader'

import App from 'components/App'

declare global {
    interface Window {
        FB: any
    }
}

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
    }
})
