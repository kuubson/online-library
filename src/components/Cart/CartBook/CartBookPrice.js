import React from 'react'
import styled from 'styled-components'

const CartBookPriceWrapper = styled.div`
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translate(-50%, 0px);
`;

const CartBookPrice = ({ price }) => {
    return (
        <CartBookPriceWrapper>${price}</CartBookPriceWrapper>
    )
}

export default CartBookPrice