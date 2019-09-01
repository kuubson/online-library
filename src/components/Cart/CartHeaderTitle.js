import React from 'react'
import styled from 'styled-components'

const CartHeaderTitleWrapper = styled.div`
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    flex: 1;
`;

const CartHeaderTitle = ({ title }) => {
    return (
        <CartHeaderTitleWrapper>{title}</CartHeaderTitleWrapper>
    )
}

export default CartHeaderTitle