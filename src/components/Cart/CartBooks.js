import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import CartHeader from './CartHeader'
import CartHeaderTitle from './CartHeaderTitle'
import CartBooksContainer from './CartBooksContainer'
import CartSummary from './CartSummary';

const CartBooksWrapper = styled.div`
    margin: 20px;
    margin-top: 0px;
    display: flex;
    flex: 1;
    align-self: stretch;
`;
const CartBooksContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.55;
`;
const CartSummaryContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.45;
`;

const CartBooks = () => {
    const cartBooks = useSelector(state => state.global.cart)
    return (
        <CartBooksWrapper>
            <CartBooksContent>
                <CartHeader>
                    <CartHeaderTitle title="Chosen books are here, ready to buy!" />
                </CartHeader>
                <CartBooksContainer cartBooks={cartBooks} />
            </CartBooksContent>
            <CartSummaryContent>
                <CartHeader>
                    <CartHeaderTitle title="Summary" />
                </CartHeader>
                <CartSummary />
            </CartSummaryContent>
        </CartBooksWrapper>
    )
}

export default CartBooks