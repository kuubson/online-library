import React from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import HomeBackground from 'assets/images/HomeBackground.png'

import Dashboard from './styled/Dashboard'

import utils from 'utils'

export const HomeContainer = styled.section`
    height: ${() => hooks.useHeight()};
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url(${HomeBackground}) center center no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <Dashboard.HeaderContainer>
                <Dashboard.Header>Online Library</Dashboard.Header>
                <Dashboard.Buttons>
                    <Dashboard.Button onClick={() => utils.redirectTo('/user/login')}>
                        Login
                    </Dashboard.Button>
                    <Dashboard.Button onClick={() => utils.redirectTo('/user/registration')}>
                        Register
                    </Dashboard.Button>
                </Dashboard.Buttons>
            </Dashboard.HeaderContainer>
            <Dashboard.Advantages>
                <Dashboard.Advantage>
                    The largest resource of books in the internet!
                </Dashboard.Advantage>
                <Dashboard.Advantage>Top books from top authors for free!</Dashboard.Advantage>
                <Dashboard.Advantage>The lowest pricing for premium books!</Dashboard.Advantage>
            </Dashboard.Advantages>
        </HomeContainer>
    )
}

export default Home
