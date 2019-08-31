import React from 'react'
import styled from 'styled-components'

const ProfileBooksHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    height: 50px;
`;

const ProfileBooksHeader = ({ children }) => {
    return (
        <ProfileBooksHeaderWrapper>{children}</ProfileBooksHeaderWrapper>
    )
}

export default ProfileBooksHeader