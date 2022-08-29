import React from 'react'
import styled from 'styled-components'
import { Actions } from 'react-native-router-flux'

import Dashboard from './styled/Dashboard'

const HomeContainer = styled.View`
    flex: 1;
    justify-content: space-around;
    align-items: center;
`

const Home = () => {
    return (
        <HomeContainer>
            <Dashboard.Header>Online Library</Dashboard.Header>
            <Dashboard.Buttons>
                <Dashboard.Button onPress={() => Actions.UserLogin()}>
                    <Dashboard.ButtonText>Login</Dashboard.ButtonText>
                </Dashboard.Button>
                <Dashboard.Button onPress={() => Actions.UserRegistration()} noMargin>
                    <Dashboard.ButtonText>Register</Dashboard.ButtonText>
                </Dashboard.Button>
            </Dashboard.Buttons>
        </HomeContainer>
    )
}

export default Home
