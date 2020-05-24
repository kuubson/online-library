import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'

import * as serviceWorker from './serviceWorker'

import 'reset-css'
import 'assets/styles/index.scss'
import theme from 'assets/styles/theme'

import App from 'components/App'

import utils from 'utils'

ReactDOM.render(
    <React.StrictMode>
        <Router history={utils.history}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorker.register({
    onUpdate: async registration => {
        await registration.unregister()
        window.location.reload(true)
    }
})
