import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'
import USHooks from './hooks'

import Composed from './composed'

import utils from 'utils'

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

const UserStore = ({ shouldExpandMenu }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [freeBooks, setFreeBooks] = useState([])
    const [paidBooks, setPaidBooks] = useState([])
    const areThereFreeBooks = freeBooks.length > 0
    const areTherePaidBooks = paidBooks.length > 0
    const [bookPopupData, setBookPopupData] = useState()
    useEffect(() => {
        const getAllBooks = async () => {
            const url = '/api/user/getAllBooks'
            const response = await utils.apiAxios.get(url)
            if (response) {
                setIsLoading(false)
                const { freeBooks, paidBooks } = response.data
                setFreeBooks(freeBooks)
                setPaidBooks(paidBooks)
            }
        }
        getAllBooks()
    }, [])
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
