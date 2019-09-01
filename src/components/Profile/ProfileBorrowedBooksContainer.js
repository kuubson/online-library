import React from 'react'
import styled from 'styled-components'
import { Buffer } from 'buffer'

import ProfileBook from './ProfileBook/ProfileBook'
import Loader from '../../sharedComponents/Loader/Loader'

const ProfileBorrowedBooksContainerWrapper = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 270px;
    grid-gap: 20px;
    flex: 1;
    position: relative;
`;

const ProfileBorrowedBooksContainer = ({ borrowedBooks, isLoading }) => {
    return (
        <ProfileBorrowedBooksContainerWrapper>
            {borrowedBooks.map(book => {
                return (
                    <ProfileBook key={book._id} free author={book.author} title={book.title} cover={book.cover} />
                    // <ProfileBook key={book._id} free author={book.author} title={book.title} price={book.price} cover="https://picsum.photos/200/300" />
                )
            })}
            {isLoading && <Loader noShadow />}
        </ProfileBorrowedBooksContainerWrapper>
    )
}

export default ProfileBorrowedBooksContainer