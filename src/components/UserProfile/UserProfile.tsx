import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { UserStoreContainer } from 'components/UserStore/UserStore'
import USDashboard from 'components/UserStore/styled/Dashboard'

import USComposed from 'components/UserStore/composed'

interface IProps {
    shouldExpandMenu?: boolean
}

interface IBook {
    id: number
    title: string
    author: string
    cover: string
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
    return (
        <UserProfileContainer shouldExpandMenu={shouldExpandMenu}>
            {!areBooksLoading &&
                (!areThereBoughtBooks && !areThereBorrowedBooks ? (
                    <USDashboard.BooksContainer>
                        <USDashboard.Books empty>
                            <USDashboard.Warning>You don't have any books yet</USDashboard.Warning>
                        </USDashboard.Books>
                    </USDashboard.BooksContainer>
                ) : (
                    <>
                        <USDashboard.BooksContainer>
                            <USDashboard.HeaderContainer>
                                <USDashboard.Header withoutPaddingRight>
                                    Your bought books
                                </USDashboard.Header>
                            </USDashboard.HeaderContainer>
                            <USDashboard.Books empty={!areThereBoughtBooks}>
                                {areThereBoughtBooks ? (
                                    boughtBooks.map(({ id, title, author, cover }) => (
                                        <USComposed.Book
                                            key={id}
                                            id={id}
                                            title={title}
                                            author={author}
                                            cover={cover}
                                        />
                                    ))
                                ) : (
                                    <USDashboard.Warning>
                                        You haven't bought any books yet
                                    </USDashboard.Warning>
                                )}
                            </USDashboard.Books>
                        </USDashboard.BooksContainer>
                        <USDashboard.BooksContainer withPaidBooks>
                            <USDashboard.HeaderContainer withMoreMarginTop>
                                <USDashboard.Header>Enjoy borrowed books!</USDashboard.Header>
                            </USDashboard.HeaderContainer>
                            <USDashboard.Books withPaidBooks empty={!areThereBorrowedBooks}>
                                {areThereBorrowedBooks ? (
                                    borrowedBooks.map(({ id, title, author, cover }) => (
                                        <USComposed.Book
                                            key={id}
                                            id={id}
                                            title={title}
                                            author={author}
                                            cover={cover}
                                        />
                                    ))
                                ) : (
                                    <USDashboard.Warning>
                                        You haven't borrowed any books yet
                                    </USDashboard.Warning>
                                )}
                            </USDashboard.Books>
                        </USDashboard.BooksContainer>
                    </>
                ))}
        </UserProfileContainer>
    )
}

export default UserProfile
