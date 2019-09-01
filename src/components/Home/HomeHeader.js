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
`;

const HomeHeader = () => {
    return (
        <HomeHeaderWrapper>
            Online Library
        </HomeHeaderWrapper>
    )
}

export default HomeHeader