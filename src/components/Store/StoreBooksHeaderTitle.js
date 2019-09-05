import React from 'react'
import styled from 'styled-components'

const StoreBooksHeaderTitleWrapper = styled.div`
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (max-width: 1200px) {
        font-size: 1.15rem;
    }
`;

const StoreBooksHeaderTitle = ({ title }) => {
    return (
        <StoreBooksHeaderTitleWrapper>{title}</StoreBooksHeaderTitleWrapper>
    )
}

export default StoreBooksHeaderTitle