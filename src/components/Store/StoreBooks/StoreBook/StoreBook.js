import React from 'react'
import styled from 'styled-components'

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

const StoreBook = ({ author, title, price, free, paid }) => {
    return (
        <StoreBookWrapper>
            <StoreBookContent src="https://picsum.photos/200/300" />
            <StoreBookAuthorAndTitleWrapper>
                {author && <StoreBookAuthor author={author} />}
                {title && <StoreBookTitle title={title} />}
            </StoreBookAuthorAndTitleWrapper>
            {price && <StoreBookPrice price={price} />}
            {free && <StoreBookButton text="Borrow" />}
            {paid && <StoreBookButton text="Buy" />}
        </StoreBookWrapper>
    )
}

export default StoreBook