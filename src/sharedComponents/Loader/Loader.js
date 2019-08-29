import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import Spinner from 'react-spinkit'

const fadeIn = keyframes`
    from {
        opacity: 0
    }
    to{
        opacity: 1
    }
`

const LoaderWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    ${props => {
        if (props.shouldFadeIn) {
            return css`
                animation: ${fadeIn} 0.7s ease-in-out both;
            `
        }
    }}
`;

const Loader = () => {
    const [shouldFadeIn, setShouldFadeIn] = useState()
    useEffect(() => {
        setShouldFadeIn(true)
    }, [])
    return (
        <LoaderWrapper shouldFadeIn={shouldFadeIn}>
            <Spinner name="ball-spin-fade-loader" fadeIn="quarter" color="white" />
        </LoaderWrapper>
    )
}

export default Loader