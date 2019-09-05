import React from 'react'
import styled from 'styled-components'
import { Buffer } from 'buffer'

import Loader from '../../sharedComponents/Loader/Loader'
import StoreBook from './StoreBook/StoreBook'

const StorePaidBooksContainerWrapper = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 300px;
    grid-gap: 20px;
    flex: 1;
    position: relative;
    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
    @media (max-width: 670px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const StorePaidBooksContainer = ({ paidBooks, isLoading }) => {
    return (
        <StorePaidBooksContainerWrapper>
            {paidBooks && paidBooks.map(book => {
                return (
                    // <StoreBook key={book._id} _id={book._id} paid author={book.author} title={book.title} price={book.price} cover={`data:image/png;base64,${Buffer.from(book.cover.data.data).toString('base64')}`} />
                    <StoreBook key={book._id} paid author={book.author} title={book.title} price={book.price} cover="https://picsum.photos/200/300" />
                )
            })}
            {isLoading && <Loader noShadow />}
        </StorePaidBooksContainerWrapper>
    )
}

export default StorePaidBooksContainer