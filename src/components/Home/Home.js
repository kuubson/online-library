import React from 'react'
import styled from 'styled-components'

import HomeBackground from '../../assets/img/HomeBackground.jpg'
import HomeHeader from './HomeHeader'
import HomeButtons from './HomeButtons'
import HomeAdvantages from './HomeAdvantages'

const HomeWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${HomeBackground}) center center no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Home = () => {
    return (
        <HomeWrapper>
            <HomeHeader />
            <HomeButtons />
            <HomeAdvantages />
        </HomeWrapper>
    )
}

export default Home