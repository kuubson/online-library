import React from 'react'
import styled from 'styled-components/macro'
import { setConfig } from 'react-hot-loader'
import { hot } from 'react-hot-loader/root'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'

import { compose } from 'redux'
import HOC from 'hoc'

import Roles from 'components/Roles'

import Home from 'components/Home/Home'

setConfig({
    reloadHooks: false
})

const AppContainer = styled.main`
    height: 100%;
`

const App: React.FC<RouteComponentProps> = ({ location }) => {
    const routes = [
        {
            pathname: '/',
            render: () => (
                <Roles.Guest>
                    <Home />
                </Roles.Guest>
            )
        },
        {
            pathname: '*',
            render: () => <Redirect to="/" />
        }
    ]
    return (
        <AppContainer>
            <Switch location={location}>
                {routes.map(({ pathname, render }) => (
                    <Route key={pathname} path={pathname} render={render} exact />
                ))}
            </Switch>
        </AppContainer>
    )
}

export default process.env.NODE_ENV === 'development'
    ? compose(HOC.withRouter)(hot(App))
    : compose(HOC.withRouter)(App)
