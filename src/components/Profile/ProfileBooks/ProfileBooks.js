import React, { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'

import ProfileBorrowedBooks from './ProfileBorrowedBooks/ProfileBorrowedBooks'
import ProfilePaidBooks from './ProfileBoughtBooks/ProfileBoughtBooks'
import ProfileBooksHeader from './ProfileBooksHeader'
import ProfileBooksHeaderTitle from './ProfileBooksHeaderTitle'
import ProfilePaidBooksContainer from './ProfileBoughtBooks/ProfileBoughtBooksContainer'
import ProfileBorrowedBooksContainer from './ProfileBorrowedBooks/ProfileBorrowedBooksContainer'

const ProfileBooksWrapper = styled.div`
    margin: 20px;
    margin-top: 0px;
    display: flex;
    flex: 1;
    align-self: stretch;
`;

const ProfileBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([])
    const [boughtBooks, setPaidBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const email = useSelector(state => state.global.userEmail)
    useLayoutEffect(() => {
        setIsLoading(true)
        axios.post('/getBooksForProfile', {
            email
        }).then(res => {
            console.log(res)
            setIsLoading(false)
            setBorrowedBooks(res.data.filter(book => {
                return !book.price
            }))
            setPaidBooks(res.data.filter(book => {
                return book.price
            }))
        })
    }, [])
    return (
        <ProfileBooksWrapper>
            <ProfilePaidBooks>
                <ProfileBooksHeader>
                    <ProfileBooksHeaderTitle title="Bought premium books are there here!" />
                </ProfileBooksHeader>
                <ProfilePaidBooksContainer isLoading={isLoading} boughtBooks={boughtBooks} />
            </ProfilePaidBooks>
            <ProfileBorrowedBooks>
                <ProfileBooksHeader>
                    <ProfileBooksHeaderTitle title="Enjoy reading your free books!" />
                </ProfileBooksHeader>
                <ProfileBorrowedBooksContainer isLoading={isLoading} borrowedBooks={borrowedBooks} />
            </ProfileBorrowedBooks>
        </ProfileBooksWrapper>
    )
}

export default ProfileBooks