import React from 'react'
import styled from 'styled-components'

const CartBookButtonWrapper = styled.div`
    background: #333;
    padding: 9px 24px;
    color: white;
    border-radius: 15px;
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translate(-50%, 0px);
    font-size: 0.9rem;
    cursor:pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.05) translate(-50%, 0px);
        transform-origin: center left;
    }
    @media (max-width: 1000px) {
        font-size: 0.8rem;
    }
`;

const CartBookButton = ({ text, onClick }) => {
    return (
        <CartBookButtonWrapper onClick={onClick}>{text}</CartBookButtonWrapper>
    )
}

export default CartBookButton