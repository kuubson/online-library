import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { API_URL } from '@env'

import USHooks from './hooks'

import Composed from './composed'

import utils from 'utils'

export const UserStoreContainer = styled.View`
    padding: ${utils.scale(0)}px ${utils.scale(15)}px ${utils.scale(35)}px ${utils.scale(15)}px;
    flex: 1;
`

const UserStore = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [freeBooks, setFreeBooks] = useState([])
    const [paidBooks, setPaidBooks] = useState([])
    const [hasMoreFreeBooks, setHasMoreFreeBooks] = useState(true)
    const [hasMorePaidBooks, setHasMorePaidBooks] = useState(true)
    const areThereFreeBooks = freeBooks.length > 0
    const areTherePaidBooks = paidBooks.length > 0
    useEffect(() => getBooks(0, 0, true), [])
    const getBooks = async (freeBooksOffset, paidBooksOffset, initialLoad) => {
        const url = `${API_URL}/api/user/getBooks`
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
        <UserStoreContainer>
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
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            loadMore={() => getBooks(freeBooks.length, 0)}
                            hasMore={hasMoreFreeBooks}
                        />
                        <Composed.Books
                            books={paidBooks}
                            header="Choose some paid books"
                            error="There are no paid books in the library right now"
                            loadMore={() => getBooks(0, paidBooks.length)}
                            hasMore={hasMorePaidBooks}
                        />
                    </>
                ) : (
                    <>
                        <Composed.Books
                            books={paidBooks}
                            header="Choose some paid books"
                            error="There are no paid books in the library right now"
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            loadMore={() => getBooks(0, paidBooks.length)}
                            hasMore={hasMorePaidBooks}
                        />
                        <Composed.Books
                            books={freeBooks}
                            header="Find here awesome books"
                            error="There are no free books in the library right now"
                            loadMore={() => getBooks(freeBooks.length, 0)}
                            hasMore={hasMoreFreeBooks}
                        />
                    </>
                ))}
        </UserStoreContainer>
    )
}

export default UserStore
