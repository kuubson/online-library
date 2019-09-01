import React from 'react'
import styled from 'styled-components'

const CartHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    height: 50px;
`;

const CartHeader = ({ children }) => {
    return (
        <CartHeaderWrapper>{children}</CartHeaderWrapper>
    )
}

export default CartHeader