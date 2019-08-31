import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const ProfileModalBookDetailsWrapper = styled.div`
    flex: 1;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`;
const ProfileModalBookDetailsHeader = styled.div`
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 25px;
`;
const ProfileModalBookDetailsDetail = styled.div`
    margin: 10px 0px;
`;

const ProfileModalBookDetails = () => {
    const title = useSelector(state => state.global.profileModalData.title)
    const author = useSelector(state => state.global.profileModalData.author)
    const price = useSelector(state => state.global.profileModalData.price)
    return (
        <ProfileModalBookDetailsWrapper>
            {price ? <ProfileModalBookDetailsHeader>That's just a small step from buying this book:</ProfileModalBookDetailsHeader>
                : <ProfileModalBookDetailsHeader>That's just a small step from getting this book:</ProfileModalBookDetailsHeader>}
            {author && <ProfileModalBookDetailsDetail>Book written by {author} </ProfileModalBookDetailsDetail>}
            {title && <ProfileModalBookDetailsDetail>Named {title}</ProfileModalBookDetailsDetail>}
            {price && <ProfileModalBookDetailsDetail>That costs ${price}</ProfileModalBookDetailsDetail>}
        </ProfileModalBookDetailsWrapper>
    )
}

export default ProfileModalBookDetails