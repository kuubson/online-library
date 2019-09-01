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
    height:${props => props.noShadow ? '100%' : '100vh'};
    background: ${props => props.noShadow ? 'none' : 'rgba(0,0,0,0.7)'};        
    display: flex;
    justify-content: center;
    align-items: center;
    position:${props => props.noShadow ? 'absolute' : 'fixed'};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    z-index: 2;
    ${props => {
        if (props.shouldFadeIn) {
            return css`
                animation: ${fadeIn} 0.7s ease-in-out both;
            `
        }
    }}
`;

const Loader = ({ noShadow }) => {
    const [shouldFadeIn, setShouldFadeIn] = useState()
    useEffect(() => {
        setShouldFadeIn(true)
    }, [])
    return (
        <LoaderWrapper shouldFadeIn={shouldFadeIn} noShadow={noShadow}>
            <Spinner name="ball-spin-fade-loader" fadeIn="quarter" color="white" />
        </LoaderWrapper>
    )
}

export default Loader