import React from 'react'
import styled from 'styled-components'

const StoreBookTitleWrapper = styled.div`
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const StoreBookTitle = ({ title }) => {
    return (
        <StoreBookTitleWrapper>{title}</StoreBookTitleWrapper>
    )
}

export default StoreBookTitle