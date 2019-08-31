import React from 'react'
import styled from 'styled-components'

const ProfileBooksHeaderTitleWrapper = styled.div`
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    flex: 1;
`;

const ProfileBooksHeaderTitle = ({ title }) => {
    return (
        <ProfileBooksHeaderTitleWrapper>{title}</ProfileBooksHeaderTitleWrapper>
    )
}

export default ProfileBooksHeaderTitle