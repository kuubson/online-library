import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const StoreModalBookDetailsWrapper = styled.div`
    flex: 1;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`;
const StoreModalBookDetailsHeader = styled.div`
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 25px;
`;
const StoreModalBookDetailsDetail = styled.div`
    margin: 10px 0px;
`;

const StoreModalBookDetails = () => {
    const title = useSelector(state => state.global.storeModalData.title)
    const author = useSelector(state => state.global.storeModalData.author)
    const price = useSelector(state => state.global.storeModalData.price)
    return (
        <StoreModalBookDetailsWrapper>
            {price ? <StoreModalBookDetailsHeader>That's just a small step from buying this book:</StoreModalBookDetailsHeader>
                : <StoreModalBookDetailsHeader>That's just a small step from getting this book:</StoreModalBookDetailsHeader>}
            {author && <StoreModalBookDetailsDetail>Book written by {author} </StoreModalBookDetailsDetail>}
            {title && <StoreModalBookDetailsDetail>Named {title}</StoreModalBookDetailsDetail>}
            {price && <StoreModalBookDetailsDetail>That costs ${price}</StoreModalBookDetailsDetail>}
        </StoreModalBookDetailsWrapper>
    )
}

export default StoreModalBookDetails