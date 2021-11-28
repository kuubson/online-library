import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'
import USHooks from './hooks'

import Composed from './composed'

import utils from 'utils'

export const UserStoreContainer = styled.section`
    min-height: ${() => hooks.useHeight()};
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transition: padding 0.4s ease-in-out;
    @media (min-width: 800px) {
        padding: 130px 20px 20px 20px;
    }
    @media (max-width: 800px) {
        flex-direction: column;
        padding: ${({ shouldMenuExpand }) =>
            shouldMenuExpand ? '330px 20px 20px 20px' : '120px 20px 20px 20px'};
    }
`

const UserStore = ({ shouldMenuExpand }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [freeBooks, setFreeBooks] = useState([])
    const [paidBooks, setPaidBooks] = useState([])
    const [hasMoreFreeBooks, setHasMoreFreeBooks] = useState(true)
    const [hasMorePaidBooks, setHasMorePaidBooks] = useState(true)
    const [bookPopupData, setBookPopupData] = useState()
    const areThereFreeBooks = freeBooks.length > 0
    const areTherePaidBooks = paidBooks.length > 0
    useEffect(() => getBooks(0, 0, true), [])
    const getBooks = async (freeBooksOffset, paidBooksOffset, initialLoad) => {
        const url = '/api/user/books/getBooks'
        const response = await utils.apiAxios.post(url, {
            freeBooksOffset,
            paidBooksOffset
        })
        if (response) {
            setIsLoading(false)
            const { freeBooks, paidBooks } = response.data
            if (initialLoad) {
                setFreeBooks(freeBooks)
                setPaidBooks(paidBooks)
            } else {
                freeBooksOffset > 0 && setHasMoreFreeBooks(freeBooks.length !== 0)
                paidBooksOffset > 0 && setHasMorePaidBooks(paidBooks.length !== 0)
                setFreeBooks(books => [...books, ...freeBooks])
                setPaidBooks(books => [...books, ...paidBooks])
            }
        }
    }
    const { renderBooksSuggestionsInput } = USHooks.useBooksSuggestions({
        freeBooks,
        setFreeBooks,
        paidBooks,
        setPaidBooks,
        withProfile: false
    })
    return (
        <UserStoreContainer shouldMenuExpand={shouldMenuExpand}>
            {bookPopupData && (
                <Composed.BookPopup {...bookPopupData} setBookPopupData={setBookPopupData} />
            )}
            {!isLoading &&
                (!areThereFreeBooks && !areTherePaidBooks ? (
                    <Composed.Books
                        books={[]}
                        error="There are no books in the library right now"
                    />
                ) : areThereFreeBooks ? (
                    <>
                        <Composed.Books
                            books={freeBooks}
                            header="Find here awesome books"
                            error="There are no free books in the library right now"
                            hasMore={hasMoreFreeBooks}
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            loadMore={() => getBooks(freeBooks.length, 0)}
                            withMarginRight
                        />
                        <Composed.Books
                            books={paidBooks}
                            header="Choose some paid books"
                            error="There are no paid books in the library right now"
                            hasMore={hasMorePaidBooks}
                            setBookPopupData={setBookPopupData}
                            loadMore={() => getBooks(0, paidBooks.length)}
                        />
                    </>
                ) : (
                    <>
                        <Composed.Books
                            books={paidBooks}
                            header="Choose some paid books"
                            error="There are no paid books in the library right now"
                            hasMore={hasMorePaidBooks}
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            loadMore={() => getBooks(0, paidBooks.length)}
                            withMarginRight
                        />
                        <Composed.Books
                            books={freeBooks}
                            header="Find here awesome books"
                            error="There are no free books in the library right now"
                            hasMore={hasMoreFreeBooks}
                            setBookPopupData={setBookPopupData}
                            loadMore={() => getBooks(freeBooks.length, 0)}
                        />
                    </>
                ))}
        </UserStoreContainer>
    )
}

export default UserStore
