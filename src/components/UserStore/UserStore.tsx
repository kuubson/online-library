import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import hooks from 'hooks'
import USHooks from './hooks'

import { HomeContainer } from 'components/Home/Home'
import Dashboard from './styled/Dashboard'

import Composed from './composed'

interface IProps {
    shouldExpandMenu?: boolean
}

export interface IBook {
    id: number
    title: string
    author: string
    cover: string
    price?: number
}

interface BooksQueryData {
    freeBooks: IBook[]
    paidBooks: IBook[]
}

export const UserStoreContainer = styled(HomeContainer)`
    height: initial;
    min-height: ${() => hooks.useHeight()};
    padding: ${({ shouldExpandMenu }: IProps) =>
        shouldExpandMenu ? '344px 20px 20px 20px' : '130px 20px 20px 20px'};
    align-items: flex-start;
    transition: padding 0.4s ease-in-out;
    @media (min-width: 800px) {
        padding: 130px 20px 20px 20px;
    }
    @media (max-width: 800px) {
        flex-direction: column;
        padding: ${({ shouldExpandMenu }) =>
            shouldExpandMenu ? '334px 20px 20px 20px' : '120px 20px 20px 20px'};
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

const UserStore: React.FC<IProps> = ({ shouldExpandMenu }) => {
    const [bookPopupData, setBookPopupData] = useState<IBook>()
    const { loading: areBooksLoading, data: books } = useQuery<BooksQueryData>(booksQuery)
    const [freeBooks, setFreeBooks] = useState<IBook[]>([])
    const [paidBooks, setPaidBooks] = useState<IBook[]>([])
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
                    <Dashboard.BooksContainer>
                        <Dashboard.Books empty>
                            <Dashboard.Warning>
                                The are no books in the library right now
                            </Dashboard.Warning>
                        </Dashboard.Books>
                    </Dashboard.BooksContainer>
                ) : (
                    <>
                        <Dashboard.BooksContainer>
                            <Dashboard.HeaderContainer>
                                <Dashboard.Header withMoreMarginBottom>
                                    Find here awesome books
                                </Dashboard.Header>
                                {renderBooksSuggestionsInput()}
                            </Dashboard.HeaderContainer>
                            <Dashboard.Books empty={!areThereFreeBooks}>
                                {areThereFreeBooks ? (
                                    freeBooks.map(({ id, title, author, cover }) => (
                                        <Composed.Book
                                            key={id}
                                            id={id}
                                            title={title}
                                            author={author}
                                            cover={cover}
                                            setBookPopupData={setBookPopupData}
                                        />
                                    ))
                                ) : (
                                    <Dashboard.Warning>
                                        The are no free books in the library right now
                                    </Dashboard.Warning>
                                )}
                            </Dashboard.Books>
                        </Dashboard.BooksContainer>
                        <Dashboard.BooksContainer withPaidBooks>
                            <Dashboard.HeaderContainer withMoreMarginTop>
                                <Dashboard.Header withoutPaddingRight>
                                    Choose some paid books
                                </Dashboard.Header>
                            </Dashboard.HeaderContainer>
                            <Dashboard.Books empty={!areTherePaidBooks} withPaidBooks>
                                {areTherePaidBooks ? (
                                    paidBooks.map(({ id, title, author, cover, price }) => (
                                        <Composed.Book
                                            key={id}
                                            id={id}
                                            title={title}
                                            author={author}
                                            cover={cover}
                                            price={price}
                                            setBookPopupData={setBookPopupData}
                                        />
                                    ))
                                ) : (
                                    <Dashboard.Warning>
                                        The are no paid books in the library right now
                                    </Dashboard.Warning>
                                )}
                            </Dashboard.Books>
                        </Dashboard.BooksContainer>
                    </>
                ))}
        </UserStoreContainer>
    )
}

export default UserStore
