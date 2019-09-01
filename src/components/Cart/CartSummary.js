import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import CartSummaryItem from './CartSummaryItem';

const CartSummaryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.45;
`;
const CartSummaryTotalPrice = styled.div`
    color: white;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    font-size: 1.4rem;
`;

const CartSummary = () => {
    const cartBooks = useSelector(state => state.global.cart)
    let totalPrice = 0
    return (
        <CartSummaryWrapper>
            {cartBooks && cartBooks.map(book => {
                totalPrice += +book.price
                return (
                    <CartSummaryItem key={totalPrice} title={book.title} price={book.price} />
                )
            })}
            {totalPrice > 0 && <CartSummaryTotalPrice>Total: ${totalPrice.toFixed(2)}</CartSummaryTotalPrice>}
        </CartSummaryWrapper>
    )
}

export default CartSummary