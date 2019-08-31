import React from 'react'
import styled from 'styled-components'

const ProfilePaidBooksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.45;
`;

const ProfilePaidBooks = ({ children }) => {
    return (
        <ProfilePaidBooksWrapper>
            {children}
        </ProfilePaidBooksWrapper>
    )
}

export default ProfilePaidBooks