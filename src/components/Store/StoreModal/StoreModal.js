import React, { useState, useLayoutEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useSelector } from 'react-redux'

import StoreModalBookImage from './StoreModalBookImage'
import StoreModalBookDetails from './StoreModalBookDetails'
import StoreModalButtons from './StoreModalButtons'

const fadeIn = keyframes`
    from{
        opacity: 0
    }
    to{
        opacity:1
    }
`;

const StoreModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    opacity: 0;
    @media (max-width: 900px) {
    }
    ${props => {
        if (props.shouldFadeIn) {
            return css`
                animation: ${fadeIn} 0.5s ease-in-out both;
            `
        }
    }}
`;
const StoreModalContent = styled.div`
    width: 60%;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 900px) {
        flex-direction: column;
        height: auto;
        min-height: 70%;
    }
    @media (max-width: 650px) {
        width: 75%;
    }
`;
const StoreModalDetailsAndButtonsWrapper = styled.div`
    flex:1;
    display: flex;
    height: 100%;
    flex-direction: column;
    @media (max-width: 900px) {
        padding-bottom: 10px;
    }
`;

const StoreModal = () => {
    const [shouldFadeIn, setShouldFadeIn] = useState()
    const cover = useSelector(state => state.global.storeModalData.cover)
    useLayoutEffect(() => {
        setShouldFadeIn(true)
    }, [])
    return (
        <StoreModalWrapper shouldFadeIn={shouldFadeIn}>
            <StoreModalContent>
                <StoreModalBookImage src={cover} />
                <StoreModalDetailsAndButtonsWrapper>
                    <StoreModalBookDetails />
                    <StoreModalButtons />
                </StoreModalDetailsAndButtonsWrapper>
            </StoreModalContent>
        </StoreModalWrapper>
    )
}

export default StoreModal