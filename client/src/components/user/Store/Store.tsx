import { useState } from 'react'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'

import Books from './modules/Books'
import BookPopup from './modules/BookPopup'

import { useBooksSuggestions } from './hooks'

type StoreQuery = {
    freeBooks: IBook[]
    paidBooks: IBook[]
}

const storeQuery = gql`
    query ($freeBooksOffset: Int!, $paidBooksOffset: Int!) {
        freeBooks(freeBooksOffset: $freeBooksOffset, paidBooksOffset: $paidBooksOffset) {
            id
            title
            author
            cover
        }
        paidBooks(paidBooksOffset: $paidBooksOffset, freeBooksOffset: $freeBooksOffset) {
            id
            title
            author
            cover
            price
        }
    }
`

type Props = {
    shouldMenuExpand?: boolean
}

export const StoreContainer = styled.section<Props>`
    min-height: 100%;
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

interface IStore {
    shouldMenuExpand?: boolean
}

const Store = ({ shouldMenuExpand }: IStore) => {
    const [loading, setLoading] = useState(true)
    const [freeBooks, setFreeBooks] = useState<IBook[]>([])
    const [paidBooks, setPaidBooks] = useState<IBook[]>([])
    const [hasMoreFreeBooks, setHasMoreFreeBooks] = useState(true)
    const [hasMorePaidBooks, setHasMorePaidBooks] = useState(true)
    const [bookPopupData, setBookPopupData] = useState<IBook>()
    const areThereFreeBooks = !!freeBooks.length
    const areTherePaidBooks = !!paidBooks.length
    const { fetchMore: getBooks } = useQuery<StoreQuery>(storeQuery, {
        variables: {
            freeBooksOffset: 0,
            paidBooksOffset: 0
        },
        onCompleted: ({ freeBooks, paidBooks }) => {
            setLoading(false)
            setFreeBooks(freeBooks)
            setPaidBooks(paidBooks)
        }
    })
    const getMoreBooks = (freeBooksOffset: number, paidBooksOffset: number) =>
        getBooks({
            variables: {
                freeBooksOffset,
                paidBooksOffset
            },
            updateQuery: (_, { fetchMoreResult }): any => {
                if (fetchMoreResult) {
                    const { freeBooks, paidBooks } = fetchMoreResult
                    freeBooksOffset > 0 && setHasMoreFreeBooks(freeBooks.length !== 0)
                    paidBooksOffset > 0 && setHasMorePaidBooks(paidBooks.length !== 0)
                    setFreeBooks(books => [...books, ...freeBooks])
                    setPaidBooks(books => [...books, ...paidBooks])
                }
            }
        })
    const { renderBooksSuggestionsInput } = useBooksSuggestions({
        freeBooks,
        setFreeBooks,
        paidBooks,
        setPaidBooks,
        withProfile: false
    })
    return (
        <StoreContainer shouldMenuExpand={shouldMenuExpand}>
            {bookPopupData && <BookPopup {...bookPopupData} setBookPopupData={setBookPopupData} />}
            {!loading &&
                (!areThereFreeBooks && !areTherePaidBooks ? (
                    <Books books={[]} error="There are no books in the library right now" />
                ) : areThereFreeBooks ? (
                    <>
                        <Books
                            books={freeBooks}
                            header="Find here awesome books"
                            error="There are no free books in the library right now"
                            hasMore={hasMoreFreeBooks}
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            loadMore={() => getMoreBooks(freeBooks.length, 0)}
                            withMarginRight
                        />
                        <Books
                            books={paidBooks}
                            header="Choose some paid books"
                            error="There are no paid books in the library right now"
                            hasMore={hasMorePaidBooks}
                            setBookPopupData={setBookPopupData}
                            loadMore={() => getMoreBooks(0, paidBooks.length)}
                        />
                    </>
                ) : (
                    <>
                        <Books
                            books={paidBooks}
                            header="Choose some paid books"
                            error="There are no paid books in the library right now"
                            hasMore={hasMorePaidBooks}
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
                            loadMore={() => getMoreBooks(0, paidBooks.length)}
                            withMarginRight
                        />
                        <Books
                            books={freeBooks}
                            header="Find here awesome books"
                            error="There are no free books in the library right now"
                            hasMore={hasMoreFreeBooks}
                            setBookPopupData={setBookPopupData}
                            loadMore={() => getMoreBooks(freeBooks.length, 0)}
                        />
                    </>
                ))}
        </StoreContainer>
    )
}

export default Store
