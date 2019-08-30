import React from 'react'
import styled from 'styled-components'

const BookUploaderCloseButtonWrapper = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.3rem;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.1)
    }
`;

const BookUploaderCloseButton = ({ onClick }) => {
    return (
        <BookUploaderCloseButtonWrapper onClick={onClick}>✕</BookUploaderCloseButtonWrapper>
    )
}

export default BookUploaderCloseButton