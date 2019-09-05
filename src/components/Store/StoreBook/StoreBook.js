import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import StoreBookTitle from './StoreBookTitle'
import StoreBookAuthor from './StoreBookAuthor'
import StoreBookPrice from './StoreBookPrice'
import StoreBookButton from './StoreBookButton'

const StoreBookWrapper = styled.div`
    position: relative;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.02)
    }
    @media (max-width: 1000px) {
        font-size: 0.8rem;
    }
    @media (max-width: 800px) {
        font-size: 0.75rem;
    }
`;
const StoreBookContent = styled.img`
    width: 100%;
    height: 100%;
`;
const StoreBookAuthorAndTitleWrapper = styled.div`
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translate(-50%, 0px);
`;

const StoreBook = ({ author, title, price, cover, free, paid }) => {
    const dispatch = useDispatch()
    const showStoreModal = () => {
        dispatch({ type: 'setShouldStoreModalAppear', payload: true })
        dispatch({
            type: 'setStoreModalData', payload: {
                title,
                author,
                price,
                cover
            }
        })
    }
    return (
        <StoreBookWrapper>
            <StoreBookContent src={cover} />
            <StoreBookAuthorAndTitleWrapper>
                {author && <StoreBookAuthor author={author} />}
                {title && <StoreBookTitle title={title} />}
            </StoreBookAuthorAndTitleWrapper>
            {price && <StoreBookPrice price={price} />}
            {free && <StoreBookButton text="Borrow" onClick={showStoreModal} />}
            {paid && <StoreBookButton text="Buy" onClick={showStoreModal} />}
        </StoreBookWrapper>
    )
}

export default StoreBook