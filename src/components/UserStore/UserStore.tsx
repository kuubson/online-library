import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import hooks from 'hooks'

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

interface QueryData {
    books: IBook[]
}

const UserStoreContainer = styled(HomeContainer)`
    height: initial;
    min-height: ${() => hooks.useHeight()};
    padding: ${({ shouldExpandMenu }: IProps) =>
        shouldExpandMenu ? '344px 20px 20px 20px' : '130px 20px 20px 20px'};
    align-items: flex-start;
    transition: padding 0.4s ease-in-out;
    @media (max-width: 900px) {
        flex-direction: column;
    }
    @media (min-width: 800px) {
        padding: 130px 20px 20px 20px;
    }
    @media (max-width: 800px) {
        padding: ${({ shouldExpandMenu }: IProps) =>
            shouldExpandMenu ? '334px 20px 20px 20px' : '120px 20px 20px 20px'};
    }
`

const query = gql`
    {
        books {
            id
            title
            author
            cover
            price
        }
    }
`

const UserStore: React.FC<IProps> = ({ shouldExpandMenu }) => {
    const { data } = useQuery<QueryData>(query)
    const [freeBooks, setFreeBooks] = useState<IBook[]>([])
    const [paidBooks, setPaidBooks] = useState<IBook[]>([])
    useEffect(() => {
        setTimeout(() => {
            if (data) {
                const freeBooks = data.books.filter(({ price }) => !price)
                const paidBooks = data.books.filter(({ price }) => price)
                setFreeBooks(freeBooks)
                setPaidBooks(paidBooks)
            }
        }, 0)
    }, [data])
    return (
        <UserStoreContainer shouldExpandMenu={shouldExpandMenu}>
            <Dashboard.BooksContainer>
                <Dashboard.Header>Find here awesome books!</Dashboard.Header>
                <Dashboard.Books>
                    {freeBooks.length > 0 ? (
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
                <Dashboard.Header withMoreMarginTop>Choose some paid books!</Dashboard.Header>
                <Dashboard.Books withPaidBooks>
                    {paidBooks.length > 0 ? (
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
        </UserStoreContainer>
    )
}

export default UserStore
