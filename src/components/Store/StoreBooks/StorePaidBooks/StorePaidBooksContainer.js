import React from 'react'
import styled from 'styled-components'
import { Buffer } from 'buffer'

import StoreBook from '../StoreBook/StoreBook'
import Loader from '../../../../sharedComponents/Loader/Loader'

const StorePaidBooksContainerWrapper = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 300px;
    grid-gap: 20px;
    flex: 1;
    position: relative;
`;

const StorePaidBooksContainer = ({ paidBooks, isLoading }) => {
    return (
        <StorePaidBooksContainerWrapper>
            {paidBooks.map(book => {
                return (
                    // <StoreBook key={book._id} paid author={book.author} title={book.title} price={book.price} cover={`data:image/png;base64,${Buffer.from(book.cover.data.data).toString('base64')}`} />
                    <StoreBook key={book._id} paid author={book.author} title={book.title} price={book.price} cover="https://picsum.photos/200/300" />
                )
            })}
            {isLoading && <Loader noShadow />}
        </StorePaidBooksContainerWrapper>
    )
}

export default StorePaidBooksContainer