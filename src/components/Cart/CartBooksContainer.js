import React from 'react'
import styled from 'styled-components'

import CartBook from './CartBook/CartBook'

const CartBooksContainerWrapper = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 270px;
    grid-gap: 20px;
    flex: 1;
    position: relative;
`;

const CartBooksContainer = ({ cartBooks }) => {
    return (
        <CartBooksContainerWrapper>
            {cartBooks && cartBooks.map(book => {
                return (
                    <CartBook id={book.id} key={book.id} author={book.author} title={book.title} price={book.price} cover={book.cover} />
                )
            })}
        </CartBooksContainerWrapper>
    )
}

export default CartBooksContainer