import React from 'react'
import styled from 'styled-components/macro'
import { setConfig } from 'react-hot-loader'
import { hot } from 'react-hot-loader/root'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { compose } from 'redux'
import hooks from 'hooks'
import hoc from 'hoc'

import Roles from 'components/Roles'

import Home from 'components/Home/Home'
import UserLogin from 'components/UserLogin/UserLogin'
import UserRegistration from 'components/UserRegistration/UserRegistration'

import { IRoute } from 'hooks/useRouterTransitions'

setConfig({
    reloadHooks: false
})

const AppContainer = styled.main`
    height: 100%;
`

const App: React.FC<RouteComponentProps> = ({ location }) => {
    const routes: IRoute[] = [
        {
            order: 0,
            pathname: '/',
            render: () => (
                <Roles.Guest>
                    <Home />
                </Roles.Guest>
            )
        },
        {
            order: 1,
            pathname: '/logowanie',
            render: () => (
                <Roles.Guest>
                    <UserLogin />
                </Roles.Guest>
            )
        },
        {
            order: 1,
            pathname: '/rejestracja',
            render: () => (
                <Roles.Guest>
                    <UserRegistration />
                </Roles.Guest>
            )
        },
        {
            order: 0,
            pathname: '*',
            render: () => <Redirect to="/" />
        }
    ]
    const { animationDirection } = hooks.useRouterTransitions(routes, location.pathname)
    return (
        <AppContainer>
            <TransitionGroup className={animationDirection}>
                <CSSTransition key={location.pathname} classNames="route__container" timeout={500}>
                    <div className="route">
                        <Switch location={location}>
                            {routes.map(({ pathname, render }) => (
                                <Route key={pathname} path={pathname} render={render} exact />
                            ))}
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </AppContainer>
    )
}

export default process.env.NODE_ENV === 'development'
    ? compose(hoc.withRouter)(hot(App))
    : compose(hoc.withRouter)(App)
