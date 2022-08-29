import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { API_URL } from '@env'

import USHooks from 'components/UserStore/hooks'

import { UserStoreContainer } from 'components/UserStore/UserStore'

import USComposed from 'components/UserStore/composed'

import utils from 'utils'

const UserProfileContainer = styled(UserStoreContainer)``

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [boughtBooks, setBoughtBooks] = useState([])
    const [borrowedBooks, setBorrowedBooks] = useState([])
    const areThereBoughtBooks = boughtBooks.length > 0
    const areThereBorrowedBooks = borrowedBooks.length > 0
    useEffect(() => {
        const getUserBooks = async () => {
            const url = `${API_URL}/api/user/getUserBooks`
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
        <UserProfileContainer>
            {!isLoading &&
                (!areThereBoughtBooks && !areThereBorrowedBooks ? (
                    <USComposed.Books books={[]} error="You don't have any books yet" />
                ) : areThereBoughtBooks ? (
                    <>
                        <USComposed.Books
                            books={boughtBooks}
                            header="Your purchased books"
                            error="You haven't purchased any books yet"
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            withProfile
                        />
                        <USComposed.Books
                            books={borrowedBooks}
                            header="Enjoy borrowed books"
                            error="You haven't borrowed any books yet"
                            withProfile
                        />
                    </>
                ) : (
                    <>
                        <USComposed.Books
                            books={borrowedBooks}
                            header="Enjoy borrowed books"
                            error="You haven't borrowed any books yet"
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            withProfile
                        />
                        <USComposed.Books
                            books={boughtBooks}
                            header="Your purchased books"
                            error="You haven't purchased any books yet"
                            withProfile
                        />
                    </>
                ))}
        </UserProfileContainer>
    )
}

export default UserProfile
