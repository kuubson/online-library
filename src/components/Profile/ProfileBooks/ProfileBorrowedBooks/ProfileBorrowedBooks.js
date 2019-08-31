import React from 'react'
import styled from 'styled-components'

const ProfileBorrowedBooksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.55;
`;

const ProfileBorrowedBooks = ({ children }) => {
    return (
        <ProfileBorrowedBooksWrapper>
            {children}
        </ProfileBorrowedBooksWrapper>
    )
}

export default ProfileBorrowedBooks