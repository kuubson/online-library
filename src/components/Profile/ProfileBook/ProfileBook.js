import React from 'react'
import styled from 'styled-components'

import ProfileBookTitle from './ProfileBookTitle'
import ProfileBookAuthor from './ProfileBookAuthor'
import ProfileBookButton from './ProfileBookButton'

const ProfileBookWrapper = styled.div`
    position: relative;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.02)
    }
    @media (max-width: 1000px) {
        font-size: 0.8rem;
    }
    @media (max-width: 800px) {
        font-size: 0.75rem;
    }
`;
const ProfileBookContent = styled.img`
    width: 100%;
    height: 100%;
`;
const ProfileBookAuthorAndTitleWrapper = styled.div`
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translate(-50%, 0px);
`;

const ProfileBook = ({ author, title, price, cover }) => {
    return (
        <ProfileBookWrapper>
            <ProfileBookContent src={cover} />
            <ProfileBookAuthorAndTitleWrapper>
                {author && <ProfileBookAuthor author={author} />}
                {title && <ProfileBookTitle title={title} />}
            </ProfileBookAuthorAndTitleWrapper>
            <ProfileBookButton text="Open" />
        </ProfileBookWrapper>
    )
}

export default ProfileBook