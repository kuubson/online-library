import React from 'react'
import styled from 'styled-components'
import { Buffer } from 'buffer'

import StoreBook from '../StoreBook/StoreBook'
import Loader from '../../../../sharedComponents/Loader/Loader'

const StoreFreeBooksContainerWrapper = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 270px;
    grid-gap: 20px;
    flex: 1;
    position: relative;
`;

const StoreFreeBooksContainer = ({ freeBooks, isLoading }) => {
    return (
        <StoreFreeBooksContainerWrapper>
            {freeBooks.map(book => {
                return (
                    // <StoreBook key={book._id} free author={book.author} title={book.title} cover={`data:image/png;base64,${Buffer.from(book.cover.data.data).toString('base64')}`} />
                    <StoreBook key={book._id} free author={book.author} title={book.title} price={book.price} cover="https://picsum.photos/200/300" />
                )
            })}
            {isLoading && <Loader noShadow />}
        </StoreFreeBooksContainerWrapper>
    )
}

export default StoreFreeBooksContainer