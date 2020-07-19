import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import USHooks from 'components/UserStore/hooks'

import { UserStoreContainer, IBook } from 'components/UserStore/UserStore'

import USComposed from 'components/UserStore/composed'
import Composed from './composed'

interface IProps {
    shouldExpandMenu?: boolean
}

interface BooksQueryData {
    borrowedBooks: IBook[]
    boughtBooks: IBook[]
}

const UserProfileContainer = styled(UserStoreContainer)``

const booksQuery = gql`
    {
        boughtBooks {
            id
            title
            author
            cover
        }
        borrowedBooks {
            id
            title
            author
            cover
        }
    }
`

const UserProfile: React.FC<IProps> = ({ shouldExpandMenu }) => {
    const { loading: areBooksLoading, data: books } = useQuery<BooksQueryData>(booksQuery, {
        fetchPolicy: 'cache-and-network'
    })
    const [boughtBooks, setBoughtBooks] = useState<IBook[]>([])
    const [borrowedBooks, setBorrowedBooks] = useState<IBook[]>([])
    const areThereBoughtBooks = boughtBooks.length > 0
    const areThereBorrowedBooks = borrowedBooks.length > 0
    useEffect(() => {
        setTimeout(() => {
            if (books) {
                setBoughtBooks(books.boughtBooks)
                setBorrowedBooks(books.borrowedBooks)
            }
        }, 0)
    }, [books])
    const [bookPopupData, setBookPopupData] = useState<IBook>()
    const { renderBooksSuggestionsInput } = USHooks.useBooksSuggestions({
        freeBooks: borrowedBooks,
        setFreeBooks: setBorrowedBooks,
        paidBooks: boughtBooks,
        setPaidBooks: setBoughtBooks,
        withProfile: true
    })
    return (
        <UserProfileContainer shouldExpandMenu={shouldExpandMenu}>
            {bookPopupData && (
                <Composed.BookPopup {...bookPopupData} setBookPopupData={setBookPopupData} />
            )}
            {!areBooksLoading &&
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
