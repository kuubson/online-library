import React from 'react'
import styled from 'styled-components/macro'

import HomeBackground from 'assets/images/HomeBackground.png'

import Dashboard from './styled/Dashboard'

const HomeContainer = styled.section`
    height: 100%;
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
                    <Dashboard.Button>Login</Dashboard.Button>
                    <Dashboard.Button>Register</Dashboard.Button>
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
