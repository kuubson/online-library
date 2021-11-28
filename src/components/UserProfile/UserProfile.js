import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import USHooks from 'components/UserStore/hooks'

import { UserStoreContainer } from 'components/UserStore/UserStore'

import USComposed from 'components/UserStore/composed'
import Composed from './composed'

import utils from 'utils'

const UserProfileContainer = styled(UserStoreContainer)``

const UserProfile = ({ shouldMenuExpand }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [boughtBooks, setBoughtBooks] = useState([])
    const [borrowedBooks, setBorrowedBooks] = useState([])
    const [bookPopupData, setBookPopupData] = useState()
    const areThereBoughtBooks = boughtBooks.length > 0
    const areThereBorrowedBooks = borrowedBooks.length > 0
    useEffect(() => {
        const getUserBooks = async () => {
            const url = '/api/user/books/getUserBooks'
            const response = await utils.apiAxios.get(url)
            if (response) {
                setIsLoading(false)
                const { boughtBooks, borrowedBooks } = response.data
                setBoughtBooks(boughtBooks)
                setBorrowedBooks(borrowedBooks)
            }
        }
        getUserBooks()
    }, [])
    const { renderBooksSuggestionsInput } = USHooks.useBooksSuggestions({
        freeBooks: borrowedBooks,
        setFreeBooks: setBorrowedBooks,
        paidBooks: boughtBooks,
        setPaidBooks: setBoughtBooks,
        withProfile: true
    })
    return (
        <UserProfileContainer shouldMenuExpand={shouldMenuExpand}>
            {bookPopupData && (
                <Composed.BookPopup {...bookPopupData} setBookPopupData={setBookPopupData} />
            )}
            {!isLoading &&
                (!areThereBoughtBooks && !areThereBorrowedBooks ? (
                    <USComposed.Books books={[]} error="You don't have any books yet" />
                ) : areThereBoughtBooks ? (
                    <>
                        <USComposed.Books
                            books={boughtBooks}
                            header="Your purchased books"
                            error="You haven't purchased any books yet"
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            withProfile
                            withMarginRight
                        />
                        <USComposed.Books
                            books={borrowedBooks}
                            header="Enjoy borrowed books"
                            error="You haven't borrowed any books yet"
                            setBookPopupData={setBookPopupData}
                            withProfile
                        />
                    </>
                ) : (
                    <>
                        <USComposed.Books
                            books={borrowedBooks}
                            header="Enjoy borrowed books"
                            error="You haven't borrowed any books yet"
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            withProfile
                            withMarginRight
                        />
                        <USComposed.Books
                            books={boughtBooks}
                            header="Your purchased books"
                            error="You haven't purchased any books yet"
                            setBookPopupData={setBookPopupData}
                            withProfile
                        />
                    </>
                ))}
        </UserProfileContainer>
    )
}

export default UserProfile
