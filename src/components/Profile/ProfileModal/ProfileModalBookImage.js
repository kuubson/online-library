import React from 'react'
import styled from 'styled-components'

const ProfileModalBookImageWrapper = styled.div`
    flex: 1;
    align-self: stretch;
    padding: 15px;
`;
const ProfileModalBookImageContent = styled.img`
    width: 100%;
    height: 100%;
`;

const ProfileModalBookImage = ({ src }) => {
    return (
        <ProfileModalBookImageWrapper >
            <ProfileModalBookImageContent src={src} />
        </ProfileModalBookImageWrapper>
    )
}

export default ProfileModalBookImage