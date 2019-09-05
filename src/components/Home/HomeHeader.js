import React from 'react'
import styled from 'styled-components'

const HomeHeaderWrapper = styled.div`
    color: white;
    font-weight: bold;
    text-align: center;
    font-size: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 0px 30px;
    @media (max-width: 1100px) {
        font-size: 4.8rem;
    }
    @media (max-width: 900px) {
        font-size: 4.3rem;
    }
    @media (max-width: 500px) {
        font-size: 3.3rem;
    }
`;

const HomeHeader = () => {
    return (
        <HomeHeaderWrapper>
            Online Library
        </HomeHeaderWrapper>
    )
}

export default HomeHeader