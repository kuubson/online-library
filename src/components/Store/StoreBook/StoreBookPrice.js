import React from 'react'
import styled from 'styled-components'

const StoreBookPriceWrapper = styled.div`
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translate(-50%, 0px);
`;

const StoreBookPrice = ({ price }) => {
    return (
        <StoreBookPriceWrapper>${price}</StoreBookPriceWrapper>
    )
}

export default StoreBookPrice