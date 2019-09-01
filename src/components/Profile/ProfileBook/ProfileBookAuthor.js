import React from 'react'
import styled from 'styled-components'

const ProfileBookAuthorWrapper = styled.div`
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
`;

const ProfileBookAuthor = ({ author }) => {
    return (
        <ProfileBookAuthorWrapper>{author}</ProfileBookAuthorWrapper>
    )
}

export default ProfileBookAuthor