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
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
`;

const ApiError = ({ responseMessage, onClick, error, warning, success }) => {
    const [shouldFadeIn, setShouldFadeIn] = useState()
    const handleClick = () => {
        setShouldFadeIn(false)
        setTimeout(() => {
            onClick()
        }, 500);
    }
    return (
        <ApiErrorWrapper shouldFadeIn={shouldFadeIn}>
            <ApiErrorContent error={error} warning={warning} success={success}>{responseMessage}</ApiErrorContent>
            <ApiErrorCloseButton onClick={handleClick}>Ok</ApiErrorCloseButton>
        </ApiErrorWrapper>
    )
}

export default ApiError