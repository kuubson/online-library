import React from 'react'
import styled from 'styled-components'

const CartHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    min-height: 50px;
    padding-top: 10px;
    @media (max-width: 1100px) {
        flex-direction: column; 
    }
    @media (max-width: 900px) {
        padding-top: 30px;
    }
`;

const CartHeader = ({ children }) => {
    return (
        <CartHeaderWrapper>{children}</CartHeaderWrapper>
    )
}

export default CartHeader