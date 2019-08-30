import React from 'react'
import styled from 'styled-components'

const BookUploaderButtonWrapper = styled.div`
    cursor: pointer;
    border: 1px solid black;
    padding: 12px 35px;
    transition: 0.5s;
    :hover{
        transform: scale(1.08)
    }
`;

const BookUploaderButton = ({ onClick }) => {
    return (
        <BookUploaderButtonWrapper onClick={onClick}>Upload</BookUploaderButtonWrapper>
    )
}

export default BookUploaderButton