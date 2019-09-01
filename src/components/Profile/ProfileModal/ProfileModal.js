import React, { useState, useLayoutEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useSelector } from 'react-redux'

import ProfileModalBookImage from './ProfileModalBookImage'
import ProfileModalBookDetails from './ProfileModalBookDetails'
import ProfileModalButtons from './ProfileModalButtons'

const fadeIn = keyframes`
    from{
        opacity: 0
    }
    to{
        opacity:1
    }
`;

const ProfileModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    opacity: 0;
    ${props => {
        if (props.shouldFadeIn) {
            return css`
                animation: ${fadeIn} 0.5s ease-in-out both;
            `
        }
    }}
`;
const ProfileModalContent = styled.div`
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
`;
const ProfileModalDetailsAndButtonsWrapper = styled.div`
    flex:1;
    display: flex;
    height: 100%;
    flex-direction: column;
`;

const ProfileModal = () => {
    const [shouldFadeIn, setShouldFadeIn] = useState()
    const cover = useSelector(state => state.global.profileModalData.cover)
    useLayoutEffect(() => {
        setShouldFadeIn(true)
    }, [])
    return (
        <ProfileModalWrapper shouldFadeIn={shouldFadeIn}>
            <ProfileModalContent>
                <ProfileModalBookImage src={cover} />
                <ProfileModalDetailsAndButtonsWrapper>
                    <ProfileModalBookDetails />
                    <ProfileModalButtons />
                </ProfileModalDetailsAndButtonsWrapper>
            </ProfileModalContent>
        </ProfileModalWrapper>
    )
}

export default ProfileModal