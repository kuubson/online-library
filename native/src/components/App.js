import React from 'react'
import { LogBox } from 'react-native'
import styled from 'styled-components'
import { Router, Stack, Scene } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

LogBox.ignoreAllLogs()

import { store, persistor } from '@redux/store'

import Roles from 'components/common/Roles'

import Loader from 'components/common/Loader/Loader'

import Home from 'components/Home/Home'
import UserLogin from 'components/UserLogin/UserLogin'
import UserRegistration from 'components/UserRegistration/UserRegistration'
import UserSupport from 'components/UserSupport/UserSupport'
import UserStore from 'components/UserStore/UserStore'
import UserProfile from 'components/UserProfile/UserProfile'
import UserCart from 'components/UserCart/UserCart'
import UserChat from 'components/UserChat/UserChat'

const AppContainer = styled.View`
    flex: 1;
`

const App = () => {
    return (
        <Provider store={store}>
            <AppContainer>
                <Router>
                    <PersistGate loading={<Loader />} persistor={persistor}>
                        <Stack key="Guest" hideNavBar={true}>
                            <Scene
                                key="Home"
                                title="Home"
                                component={() => (
                                    <Roles.Guest>
                                        <Home />
                                    </Roles.Guest>
                                )}
                                initial={true}
                            />
                            <Scene
                                key="UserLogin"
                                title="UserLogin"
                                component={() => (
                                    <Roles.Guest>
                                        <UserLogin />
                                    </Roles.Guest>
                                )}
                            />
                            <Scene
                                key="UserRegistration"
                                title="UserRegistration"
                                component={() => (
                                    <Roles.Guest>
                                        <UserRegistration />
                                    </Roles.Guest>
                                )}
                            />
                            <Scene
                                key="UserPasswordSupport"
                                title="UserPasswordSupport"
                                component={() => (
                                    <Roles.Guest>
                                        <UserSupport withPasswordSupport />
                                    </Roles.Guest>
                                )}
                            />
                            <Scene
                                key="UserEmailSupport"
                                title="UserEmailSupport"
                                component={() => (
                                    <Roles.Guest>
                                        <UserSupport />
                                    </Roles.Guest>
                                )}
                            />
                        </Stack>
                        <Stack key="User" hideNavBar={true}>
                            <Scene
                                key="UserStore"
                                title="UserStore"
                                component={() => (
                                    <Roles.User scene="Store">
                                        <UserStore />
                                    </Roles.User>
                                )}
                                initial={true}
                            />
                            <Scene
                                key="UserProfile"
                                title="UserProfile"
                                component={() => (
                                    <Roles.User scene="Profile">
                                        <UserProfile />
                                    </Roles.User>
                                )}
                            />
                            <Scene
                                key="UserCart"
                                title="UserCart"
                                component={() => (
                                    <Roles.User scene="Cart">
                                        <UserCart />
                                    </Roles.User>
                                )}
                            />
                            <Scene
                                key="UserChat"
                                title="UserChat"
                                component={() => (
                                    <Roles.User scene="Chat">
                                        <UserChat />
                                    </Roles.User>
                                )}
                            />
                        </Stack>
                    </PersistGate>
                </Router>
            </AppContainer>
        </Provider>
    )
}

export default App
