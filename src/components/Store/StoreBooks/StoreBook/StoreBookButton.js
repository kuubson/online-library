import React from 'react'
import styled from 'styled-components'

const StoreBookButtonWrapper = styled.div`
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
`;

const StoreBookButton = ({ text }) => {
    return (
        <StoreBookButtonWrapper>{text}</StoreBookButtonWrapper>
    )
}

export default StoreBookButton