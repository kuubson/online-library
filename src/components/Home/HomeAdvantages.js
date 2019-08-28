import React from 'react'
import styled from 'styled-components'

const HomeAdvantagesWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
`;
const HomeAdvantage = styled.div`
    color: white;
    font-size: 1.8rem;
    max-width: 20%;
    text-align: center;
    position: relative;
    ::after{
        content: '';
        width: 70%;
        height: 3px;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translate(-50%, 0);
        background: white;
    }
`;

const HomeAdvantages = () => {
    return (
        <HomeAdvantagesWrapper>
            <HomeAdvantage>The largest resource of books in the internet!</HomeAdvantage>
            <HomeAdvantage>Top books from top authors for free!</HomeAdvantage>
            <HomeAdvantage>The lowest pricing for premium books!</HomeAdvantage>
        </HomeAdvantagesWrapper>
    )
}

export default HomeAdvantages