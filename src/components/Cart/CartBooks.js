import React from 'react'
import styled, { css } from 'styled-components'
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
    ${props => {
        if (props.isEmpty) {
            return css`
                justify-content: center;
                align-items: center;
            `
        }
    }}
    @media (max-width: 680px) {
        flex-direction: column;
    }
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
const CartBooksEmptyCart = styled.div`
    color: white;
    font-size: 1.8rem;
    @media (max-width: 900px) {
        font-size: 1.6rem;
    }
    @media (max-width: 400px) {
        font-size: 1.25rem;
    }
`;

const CartBooks = () => {
    const cartBooks = useSelector(state => state.global.cart)
    return (
        <CartBooksWrapper isEmpty={!cartBooks.length}>
            {cartBooks.length ?
                <>
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
                </> :
                <CartBooksEmptyCart>Your cart is empty!</CartBooksEmptyCart>
            }
        </CartBooksWrapper>
    )
}

export default CartBooks