import React from 'react'
import styled from 'styled-components'

const StoreBooksHeaderTitleWrapper = styled.div`
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    flex: 1;
`;

const StoreBooksHeaderTitle = ({ title }) => {
    return (
        <StoreBooksHeaderTitleWrapper>{title}</StoreBooksHeaderTitleWrapper>
    )
}

export default StoreBooksHeaderTitle