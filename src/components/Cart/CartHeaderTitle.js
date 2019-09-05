import React from 'react'
import styled from 'styled-components'

const CartHeaderTitleWrapper = styled.div`
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (max-width: 1200px) {
        font-size: 1.15rem;
    }
`;

const CartHeaderTitle = ({ title }) => {
    return (
        <CartHeaderTitleWrapper>{title}</CartHeaderTitleWrapper>
    )
}

export default CartHeaderTitle