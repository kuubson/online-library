import React from 'react'
import styled from 'styled-components'

const CartSummaryItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
`;
const CartSummaryItemTitleAndPriceWrapper = styled.div`
    color: white;
    display: flex;
`;
const CartSummaryItemTitle = styled.div`
    margin-right: 20px;
`;
const CartSummaryItemPrice = styled.div`

`;

const CartSummaryItem = ({ title, price }) => {
    return (
        <CartSummaryItemWrapper>
            <CartSummaryItemTitleAndPriceWrapper>
                <CartSummaryItemTitle>{title}</CartSummaryItemTitle>
                <CartSummaryItemPrice>1 x ${price}</CartSummaryItemPrice>
            </CartSummaryItemTitleAndPriceWrapper>
        </CartSummaryItemWrapper>
    )
}

export default CartSummaryItem