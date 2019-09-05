import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

const fadeOut = keyframes`
    from {
        opacity: 1
    }
    to{
        opacity: 0
    }
`

const ApiErrorWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    ${props => {
        if (props.shouldFadeIn === false) {
            return css`
                animation: ${fadeOut} 0.2s ease-in-out both;
            `
        }
    }}
`;
const ApiErrorContent = styled.div`
    font-weight: bold;
    font-size: 1.2rem;
    @media (max-width: 650px) {
        font-size: 1.05rem;
    }
    ${props => {
        if (props.error) {
            return css`
                color: #f51414;
            `
        }
        if (props.warning) {
            return css`
                color: #de8d02;
            `
        }
        if (props.success) {
            return css`
                color: #24b530;
            `
        }
    }}
`;
const ApiErrorCloseButton = styled.div`
    border: 1.5px solid white;
    padding: 12px 50px;
    color: white;
    margin-top: 60px;
    cursor: pointer;
    @media (max-width: 1000px) {
        padding: 12px 42px;
    }
    @media (max-width: 650px) {
        font-size: 0.85rem;
    }
    @media (max-width: px) {
        padding: 12px 32px;   
    }
`;

const ApiError = ({ responseMessage, onClick, error, warning, success }) => {
    const [shouldFadeIn, setShouldFadeIn] = useState()
    const handleClick = () => {
        setShouldFadeIn(false)
        onClick()
    }
    return (
        <ApiErrorWrapper shouldFadeIn={shouldFadeIn}>
            <ApiErrorContent error={error} warning={warning} success={success}>{responseMessage}</ApiErrorContent>
            <ApiErrorCloseButton onClick={handleClick}>Ok</ApiErrorCloseButton>
        </ApiErrorWrapper>
    )
}

export default ApiError