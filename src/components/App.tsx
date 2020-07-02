import React from 'react'
import styled from 'styled-components/macro'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import { compose } from 'redux'
import hoc from 'hoc'

import hooks from 'hooks'

import RouterTransition from 'components/common/RouterTransitions'

import Roles from 'components/Roles'

import Loader from 'components/Loader/Loader'
import FeedbackHandler from 'components/FeedbackHandler/FeedbackHandler'

import Home from 'components/Home/Home'
import UserRegistration from 'components/UserRegistration/UserRegistration'
import UserAuthenticator from 'components/UserAuthenticator/UserAuthenticator'
import UserSupport from 'components/UserSupport/UserSupport'
import UserLogin from 'components/UserLogin/UserLogin'
import UserPasswordRecovery from 'components/UserPasswordRecovery/UserPasswordRecovery'
import UserStore from 'components/UserStore/UserStore'

import { IRoute } from 'components/common/RouterTransitions'

const AppContainer = styled.main`
    height: ${() => hooks.useHeight()};
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
            pathname: '/user/registration',
            render: () => (
                <Roles.Guest>
                    <UserRegistration />
                </Roles.Guest>
            )
        },
        {
            order: 1,
            pathname: '/user/authentication/:token',
            render: () => (
                <Roles.Guest>
                    <UserAuthenticator />
                </Roles.Guest>
            )
        },
        {
            order: 2,
            pathname: '/user/email-support',
            render: () => (
                <Roles.Guest>
                    <UserSupport />
                </Roles.Guest>
            )
        },
        {
            order: 2,
            pathname: '/user/login',
            render: () => (
                <Roles.Guest>
                    <UserLogin />
                </Roles.Guest>
            )
        },
        {
            order: 3,
            pathname: '/user/password-support',
            render: () => (
                <Roles.Guest>
                    <UserSupport withPasswordSupport />
                </Roles.Guest>
            )
        },
        {
            order: 3,
            pathname: '/user/password-recovery/:passwordToken',
            render: () => (
                <Roles.Guest>
                    <UserPasswordRecovery />
                </Roles.Guest>
            )
        },
        {
            order: 3,
            pathname: '/user/store',
            render: () => (
                <Roles.User>
                    <UserStore />
                </Roles.User>
            )
        },
        {
            order: 0,
            pathname: '*',
            render: () => <Redirect to="/" />
        }
    ]
    const { isLoading } = hooks.useLoader()
    const { shouldFeedbackHandlerAppear } = hooks.useFeedbackHandler()
    return (
        <AppContainer>
            {isLoading && <Loader />}
            {shouldFeedbackHandlerAppear && <FeedbackHandler />}
            <RouterTransition routes={routes} location={location.pathname}>
                <Switch location={location}>
                    {routes.map(({ pathname, render }) => (
                        <Route key={pathname} path={pathname} render={render} exact />
                    ))}
                </Switch>
            </RouterTransition>
        </AppContainer>
    )
}

export default process.env.NODE_ENV === 'production'
    ? compose(hoc.withRouter)(App)
    : compose(hoc.withRouter)(hot(App))
