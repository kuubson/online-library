import React from 'react'
import styled from 'styled-components'

const CartBookTitleWrapper = styled.div`
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const CartBookTitle = ({ title }) => {
    return (
        <CartBookTitleWrapper>{title}</CartBookTitleWrapper>
    )
}

export default CartBookTitle