import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import getCookie from '../../resources/helpers/getCookie'

import MainBackground from '../../assets/img/MainBackground.jpg'
import HomeHeader from './HomeHeader'
import HomeButtons from './HomeButtons'
import HomeAdvantages from './HomeAdvantages'

const HomeWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${MainBackground}) center center no-repeat;
    background-size: cover;
    display: flex;
`;
const HomeHeaderAndButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    flex: 1;
`;

const Home = ({ history }) => {
    useLayoutEffect(() => {
        if (getCookie('token')) history.push('/store')
    }, [])
    return (
        <HomeWrapper>
            <HomeHeaderAndButtonsWrapper>
                <HomeHeader />
                <HomeButtons />
            </HomeHeaderAndButtonsWrapper>
            <HomeAdvantages />
        </HomeWrapper>
    )
}

export default Home