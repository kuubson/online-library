import React from 'react'
import styled from 'styled-components'

const StoreBooksHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    height: 50px;
`;

const StoreBooksHeader = ({ children }) => {
    return (
        <StoreBooksHeaderWrapper>{children}</StoreBooksHeaderWrapper>
    )
}

export default StoreBooksHeader