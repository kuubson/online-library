import React from 'react'
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
    freeBooks: IBook[]
    paidBooks: IBook[]
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

const query = gql`
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
    const { data } = useQuery<QueryData>(query)
    const areThereFreeBooks = data && data!.freeBooks.length > 0
    const areTherePaidBooks = data && data!.paidBooks.length > 0
    return (
        <UserStoreContainer shouldExpandMenu={shouldExpandMenu}>
            {areThereFreeBooks && areTherePaidBooks ? (
                <>
                    <Dashboard.BooksContainer>
                        <Dashboard.Header>Find here awesome books!</Dashboard.Header>
                        <Dashboard.Books
                            empty={!areThereFreeBooks}
                            height={() => hooks.useHeight()}
                        >
                            {areThereFreeBooks ? (
                                data!.freeBooks.map(({ id, title, author, cover }) => (
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
                        <Dashboard.Header withMoreMarginTop>
                            Choose some paid books!
                        </Dashboard.Header>
                        <Dashboard.Books
                            withPaidBooks
                            empty={!areTherePaidBooks}
                            height={() => hooks.useHeight()}
                        >
                            {areTherePaidBooks ? (
                                data!.paidBooks.map(({ id, title, author, cover, price }) => (
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
            )}
        </UserStoreContainer>
    )
}

export default UserStore
