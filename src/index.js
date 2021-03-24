import React from 'react'

import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import 'assets/styles/index.scss'
import 'assets/styles/routerTransitions.scss'
import theme from 'assets/styles/theme'

import { store, persistor } from 'redux/store'

import Loader from 'components/common/Loader/Loader'

import App from 'components/App'

import utils from 'utils'

render(
    <React.StrictMode>
        <Router history={utils.history}>
            <Provider store={store}>
                <PersistGate loading={<Loader />} persistor={persistor}>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorkerRegistration.register({
    onUpdate: async registration => {
        await registration.unregister()
        window.location.reload(true)
    }
})