import React from 'react'
import styled from 'styled-components'

const HomeAdvantagesWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    flex: 1;
`;
const HomeAdvantage = styled.div`
    color: white;
    font-size: 1.8rem;
    max-width: 50%;
    text-align: center;
    margin: 30px 0px;
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