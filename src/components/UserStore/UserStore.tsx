import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import hooks from 'hooks'

import { HomeContainer } from 'components/Home/Home'
import Dashboard from './styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'
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

interface TitleSuggestionsQueryData {
    titleSuggestions: IBook[]
}

const UserStoreContainer = styled(HomeContainer)`
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
        padding: ${({ shouldExpandMenu }: IProps) =>
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

const titleSuggestionsQuery = gql`
    query TitleSuggestions($title: String!, $author: String!) {
        titleSuggestions(title: $title, author: $author) {
            title
            author
            price
        }
    }
`

const UserStore: React.FC<IProps> = ({ shouldExpandMenu }) => {
    const { loading: areBooksLoading, data: books } = useQuery<BooksQueryData>(booksQuery)
    const [freeBooks, setFreeBooks] = useState<IBook[]>([])
    const [paidBooks, setPaidBooks] = useState<IBook[]>([])
    const areThereFreeBooks = freeBooks.length > 0
    const areTherePaidBooks = paidBooks.length > 0
    useEffect(() => {
        if (books) {
            setFreeBooks(books.freeBooks)
            setPaidBooks(books.paidBooks)
        }
    }, [books])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [findByTitle, setFindByTitle] = useState(true)
    const { data: titleSuggestions } = useQuery<TitleSuggestionsQueryData>(titleSuggestionsQuery, {
        variables: {
            title,
            author
        }
    })
    return (
        <UserStoreContainer shouldExpandMenu={shouldExpandMenu}>
            {!areBooksLoading &&
                (areThereFreeBooks && areTherePaidBooks ? (
                    <>
                        <Dashboard.BooksContainer>
                            <Dashboard.HeaderContainer>
                                <Dashboard.Header withMoreMarginBottom>
                                    Find here awesome books!
                                </Dashboard.Header>
                                <Dashboard.InputContainer>
                                    {findByTitle ? (
                                        <URComposed.Input
                                            id="title"
                                            type="text"
                                            value={title}
                                            placeholder="Type book's title..."
                                            error=""
                                            onChange={({ target }) => setTitle(target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        <URComposed.Input
                                            id="author"
                                            type="text"
                                            value={author}
                                            placeholder="Type author's name..."
                                            error=""
                                            onChange={({ target }) => setAuthor(target.value)}
                                            fullWidth
                                        />
                                    )}
                                    <Dashboard.Switcher
                                        onClick={() => {
                                            findByTitle ? setTitle('') : setAuthor('')
                                            setFindByTitle(findByTitle => !findByTitle)
                                        }}
                                    >
                                        By {findByTitle ? 'author' : 'title'}
                                    </Dashboard.Switcher>
                                    <Dashboard.SuggestionsContainer>
                                        {titleSuggestions &&
                                            titleSuggestions!.titleSuggestions.map(
                                                ({ title, author, price }) => (
                                                    <Dashboard.Suggestion
                                                        onClick={() => {
                                                            if (findByTitle) {
                                                                if (price) {
                                                                    const books = paidBooks.filter(
                                                                        book => book.title !== title
                                                                    )
                                                                    const book = paidBooks.find(
                                                                        book => book.title === title
                                                                    )!
                                                                    setPaidBooks([book, ...books])
                                                                } else {
                                                                    const books = freeBooks.filter(
                                                                        book => book.title !== title
                                                                    )
                                                                    const book = freeBooks.find(
                                                                        book => book.title === title
                                                                    )!
                                                                    setFreeBooks([book, ...books])
                                                                }
                                                            } else {
                                                                if (price) {
                                                                    const books = paidBooks.filter(
                                                                        book => book.title !== title
                                                                    )
                                                                    const book = paidBooks.find(
                                                                        book => book.title === title
                                                                    )!
                                                                    setPaidBooks([book, ...books])
                                                                } else {
                                                                    const books = freeBooks.filter(
                                                                        book => book.title !== title
                                                                    )
                                                                    const book = freeBooks.find(
                                                                        book => book.title === title
                                                                    )!
                                                                    setFreeBooks([book, ...books])
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        "{title}" written by {author}
                                                    </Dashboard.Suggestion>
                                                )
                                            )}
                                    </Dashboard.SuggestionsContainer>
                                </Dashboard.InputContainer>
                            </Dashboard.HeaderContainer>
                            <Dashboard.Books
                                empty={!areThereFreeBooks}
                                height={() => hooks.useHeight()}
                            >
                                {areThereFreeBooks ? (
                                    freeBooks.map(({ id, title, author, cover }) => (
                                        <Composed.Book
                                            key={id}
                                            id={id}
                                            title={title}
                                            author={author}
                                            cover={cover}
                                        />
                                    ))
                                ) : (
                                    <Dashboard.Warning>
                                        The are no free books in the library right now!
                                    </Dashboard.Warning>
                                )}
                            </Dashboard.Books>
                        </Dashboard.BooksContainer>
                        <Dashboard.BooksContainer withPaidBooks>
                            <Dashboard.HeaderContainer withMoreMarginTop>
                                <Dashboard.Header>Choose some paid books!</Dashboard.Header>
                            </Dashboard.HeaderContainer>
                            <Dashboard.Books
                                withPaidBooks
                                empty={!areTherePaidBooks}
                                height={() => hooks.useHeight()}
                            >
                                {areTherePaidBooks ? (
                                    paidBooks.map(({ id, title, author, cover, price }) => (
                                        <Composed.Book
                                            key={id}
                                            id={id}
                                            title={title}
                                            author={author}
                                            cover={cover}
                                            price={price}
                                        />
                                    ))
                                ) : (
                                    <Dashboard.Warning>
                                        The are no paid books in the library right now!
                                    </Dashboard.Warning>
                                )}
                            </Dashboard.Books>
                        </Dashboard.BooksContainer>
                    </>
                ) : (
                    <Dashboard.BooksContainer>
                        <Dashboard.Books empty height={() => hooks.useHeight()}>
                            <Dashboard.Warning>
                                The are no books in the library right now!
                            </Dashboard.Warning>
                        </Dashboard.Books>
                    </Dashboard.BooksContainer>
                ))}
        </UserStoreContainer>
    )
}

export default UserStore
