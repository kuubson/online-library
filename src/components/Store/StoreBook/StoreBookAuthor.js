import React from 'react'
import styled from 'styled-components'

const StoreBookAuthorWrapper = styled.div`
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
`;

const StoreBookAuthor = ({ author }) => {
    return (
        <StoreBookAuthorWrapper>{author}</StoreBookAuthorWrapper>
    )
}

export default StoreBookAuthor