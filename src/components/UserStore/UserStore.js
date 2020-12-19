import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import hooks from 'hooks'
import USHooks from './hooks'

import Composed from './composed'

export const UserStoreContainer = styled.section`
    min-height: ${() => hooks.useHeight()};
    padding: ${({ shouldExpandMenu }) =>
        shouldExpandMenu ? '290px 20px 20px 20px' : '130px 20px 20px 20px'};
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transition: padding 0.4s ease-in-out;
    @media (min-width: 800px) {
        padding: 130px 20px 20px 20px;
    }
    @media (max-width: 800px) {
        flex-direction: column;
        padding: ${({ shouldExpandMenu }) =>
            shouldExpandMenu ? '280px 20px 20px 20px' : '120px 20px 20px 20px'};
    }
`

const booksQuery = gql`
    {
        freeBooks {
            id
            title
            author
            cover
        }
        paidBooks {
            id
            title
            author
            cover
            price
        }
    }
`

const UserStore = ({ shouldExpandMenu }) => {
    const { loading: areBooksLoading, data: books } = useQuery(booksQuery)
    const [freeBooks, setFreeBooks] = useState([])
    const [paidBooks, setPaidBooks] = useState([])
    const areThereFreeBooks = freeBooks.length > 0
    const areTherePaidBooks = paidBooks.length > 0
    useEffect(() => {
        setTimeout(() => {
            if (books) {
                setFreeBooks(books.freeBooks)
                setPaidBooks(books.paidBooks)
            }
        }, 0)
    }, [books])
    const [bookPopupData, setBookPopupData] = useState()
    const { renderBooksSuggestionsInput } = USHooks.useBooksSuggestions({
        freeBooks,
        setFreeBooks,
        paidBooks,
        setPaidBooks,
        withProfile: false
    })
    return (
        <UserStoreContainer shouldExpandMenu={shouldExpandMenu}>
            {bookPopupData && (
                <Composed.BookPopup {...bookPopupData} setBookPopupData={setBookPopupData} />
            )}
            {!areBooksLoading &&
                (!areThereFreeBooks && !areTherePaidBooks ? (
                    <Composed.Books books={[]} error="The are no books in the library right now" />
                ) : areThereFreeBooks ? (
                    <>
                        <Composed.Books
                            books={freeBooks}
                            header="Find here awesome books"
                            error="The are no free books in the library right now"
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            withMarginRight
                        />
                        <Composed.Books
                            books={paidBooks}
                            header="Choose some paid books"
                            error="The are no paid books in the library right now"
                            setBookPopupData={setBookPopupData}
                        />
                    </>
                ) : (
                    <>
                        <Composed.Books
                            books={paidBooks}
                            header="Choose some paid books"
                            error="The are no paid books in the library right now"
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            withMarginRight
                        />
                        <Composed.Books
                            books={freeBooks}
                            header="Find here awesome books"
                            error="The are no free books in the library right now"
                            setBookPopupData={setBookPopupData}
                        />
                    </>
                ))}
        </UserStoreContainer>
    )
}

export default UserStore
