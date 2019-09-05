import React from 'react'
import styled from 'styled-components'

const HomeAdvantagesWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    flex: 1;
    @media (max-width: 700px) {
        display: none;
    }
`;
const HomeAdvantage = styled.div`
    color: white;
    font-size: 1.8rem;
    max-width: 50%;
    text-align: center;
    margin: 30px 0px;
    @media (max-width: 1110px) {
        font-size: 1.65rem;
    }
    @media (max-width: 900px) {
        font-size: 1.35rem;
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