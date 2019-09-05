import React from 'react'
import styled from 'styled-components'

const ProfileBooksHeaderTitleWrapper = styled.div`
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1200px) {
        font-size: 1.15rem;
    }
`;

const ProfileBooksHeaderTitle = ({ title }) => {
    return (
        <ProfileBooksHeaderTitleWrapper>{title}</ProfileBooksHeaderTitleWrapper>
    )
}

export default ProfileBooksHeaderTitle