import React from 'react'
import styled from 'styled-components'

import MainBackground from '../../assets/img/MainBackground.jpg'

const ProfileWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${MainBackground}) center center no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Profile = () => {
    return (
        <ProfileWrapper>

        </ProfileWrapper>
    )
}

export default Profile