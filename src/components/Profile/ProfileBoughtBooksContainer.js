import React from 'react'
import styled from 'styled-components'
import { Buffer } from 'buffer'

import ProfileBook from './ProfileBook/ProfileBook'
import Loader from '../../sharedComponents/Loader/Loader'

const ProfilePaidBooksContainerWrapper = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 270px;
    grid-gap: 20px;
    flex: 1;
    position: relative;
`;

const ProfilePaidBooksContainer = ({ boughtBooks, isLoading }) => {
    return (
        <ProfilePaidBooksContainerWrapper>
            {boughtBooks.map(book => {
                return (
                    // <ProfileBook key={book._id} paid author={book.author} title={book.title} price={book.price} cover={`data:image/png;base64,${Buffer.from(book.cover.data.data).toString('base64')}`} />
                    <ProfileBook key={book._id} paid author={book.author} title={book.title} price={book.price} cover="https://picsum.photos/200/300" />
                )
            })}
            {isLoading && <Loader noShadow />}
        </ProfilePaidBooksContainerWrapper>
    )
}

export default ProfilePaidBooksContainer