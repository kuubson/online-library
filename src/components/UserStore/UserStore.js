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
    const areThereFreeBooks = freeBooks.length > 0
    const areTherePaidBooks = paidBooks.length > 0
    const [bookPopupData, setBookPopupData] = useState()
    const getBooks = async (freeBooksOffset, paidBooksOffset, initialLoad) => {
        const url = '/api/user/getBooks'
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
    useEffect(() => {
        getBooks(0, 0, true)
    }, [])
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
                    <Composed.Books books={[]} error="The are no books in the library right now" />
                ) : areThereFreeBooks ? (
                    <>
                        <Composed.Books
                            books={freeBooks}
                            header="Find here awesome books"
                            error="The are no free books in the library right now"
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            loadMore={() => getBooks(freeBooks.length, 0)}
                            hasMore={hasMoreFreeBooks}
                            withMarginRight
                        />
                        <Composed.Books
                            books={paidBooks}
                            header="Choose some paid books"
                            error="The are no paid books in the library right now"
                            setBookPopupData={setBookPopupData}
                            loadMore={() => getBooks(0, paidBooks.length)}
                            hasMore={hasMorePaidBooks}
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
                            loadMore={() => getBooks(0, paidBooks.length)}
                            hasMore={hasMorePaidBooks}
                            withMarginRight
                        />
                        <Composed.Books
                            books={freeBooks}
                            header="Find here awesome books"
                            error="The are no free books in the library right now"
                            setBookPopupData={setBookPopupData}
                            loadMore={() => getBooks(freeBooks.length, 0)}
                            hasMore={hasMoreFreeBooks}
                        />
                    </>
                ))}
        </UserStoreContainer>
    )
}

export default UserStore
