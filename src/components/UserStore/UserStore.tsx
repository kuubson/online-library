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

interface BooksSuggestionsQueryData {
    booksSuggestions: IBook[]
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

const BooksSuggestionsQuery = gql`
    query BooksSuggestions($title: String!, $author: String!) {
        booksSuggestions(title: $title, author: $author) {
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
    const { data: booksSuggestions } = useQuery<BooksSuggestionsQueryData>(BooksSuggestionsQuery, {
        variables: {
            title,
            author
        }
    })
    const [bookPopupData, setBookPopupData] = useState<IBook>()
    const switchFindBy = () => {
        findByTitle ? setTitle('') : setAuthor('')
        setFindByTitle(findByTitle => !findByTitle)
    }
    const sortBySuggestion = (title: string, author: string, price: number) => {
        if (!price) {
            if (findByTitle) {
                const freeBooksByTitle = freeBooks.filter(book => book.title !== title)
                const freeBookByTitle = freeBooks.find(book => book.title === title)!
                setFreeBooks([freeBookByTitle, ...freeBooksByTitle])
            } else {
                const freeBooksByAuthor = freeBooks.filter(book => book.author !== author)
                const freeBookByAuthor = freeBooks.find(book => book.author === author)!
                setFreeBooks([freeBookByAuthor, ...freeBooksByAuthor])
            }
        } else {
            if (findByTitle) {
                const paidBooksByTitle = paidBooks.filter(book => book.title !== title)
                const paidBookByTitle = paidBooks.find(book => book.title === title)!
                setPaidBooks([paidBookByTitle, ...paidBooksByTitle])
            } else {
                const paidBooksByAuthor = paidBooks.filter(book => book.author !== author)
                const paidBookByAuthor = paidBooks.find(book => book.author === author)!
                setPaidBooks([paidBookByAuthor, ...paidBooksByAuthor])
            }
        }
        if (findByTitle) {
            setTitle('')
        } else {
            setAuthor('')
        }
    }
    return (
        <UserStoreContainer shouldExpandMenu={shouldExpandMenu}>
            {bookPopupData && (
                <Composed.BookPopup {...bookPopupData} setBookPopupData={setBookPopupData} />
            )}
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
                                    <Dashboard.Switcher onClick={switchFindBy}>
                                        By {findByTitle ? 'author' : 'title'}
                                    </Dashboard.Switcher>
                                    <Dashboard.SuggestionsContainer>
                                        {booksSuggestions &&
                                            booksSuggestions!.booksSuggestions.map(
                                                ({ title, author, price }) => (
                                                    <Dashboard.Suggestion
                                                        onClick={() =>
                                                            sortBySuggestion(title, author, price!)
                                                        }
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
                                            setBookPopupData={setBookPopupData}
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
                                            setBookPopupData={setBookPopupData}
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
