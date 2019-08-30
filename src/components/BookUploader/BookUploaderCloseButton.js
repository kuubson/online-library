import React from 'react'
import { useDispatch } from 'react-redux'
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

const BookUploaderCloseButton = () => {
    const dispatch = useDispatch()
    const hideBookUploader = () => dispatch({ type: 'setShouldBookUploaderAppear', payload: false })
    return (
        <BookUploaderCloseButtonWrapper onClick={hideBookUploader}>✕</BookUploaderCloseButtonWrapper>
    )
}

export default BookUploaderCloseButton