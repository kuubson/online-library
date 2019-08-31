import React from 'react'
import styled from 'styled-components'

const ProfileBookTitleWrapper = styled.div`
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const ProfileBookTitle = ({ title }) => {
    return (
        <ProfileBookTitleWrapper>{title}</ProfileBookTitleWrapper>
    )
}

export default ProfileBookTitle