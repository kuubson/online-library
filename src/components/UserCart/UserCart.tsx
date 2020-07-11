import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import hooks from 'hooks'

import { UserStoreContainer, IBook } from 'components/UserStore/UserStore'
import USDashboard from 'components/UserStore/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import USComposed from 'components/UserStore/composed'

interface IProps {
    shouldExpandMenu?: boolean
}

interface CartQueryData {
    cart: IBook[]
}

const UserCartContainer = styled(UserStoreContainer)`
    justify-content: flex-start;
`

const cartQuery = gql`
    query Cart($ids: [ID]) {
        cart(ids: $ids) {
            id
            title
            author
            cover
            price
        }
    }
`

const UserCart: React.FC<IProps> = ({ shouldExpandMenu }) => {
    const { cart: ids } = hooks.useCart()
    const { data } = useQuery<CartQueryData>(cartQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            ids
        }
    })
    const [books, setBooks] = useState<IBook[]>([])
    const areThereBooks = books.length > 0
    useEffect(() => {
        setTimeout(() => {
            if (data) {
                setBooks(data.cart)
            }
        }, 0)
    }, [data])
    return (
        <UserCartContainer shouldExpandMenu={shouldExpandMenu}>
            <>
                <USDashboard.BooksContainer>
                    <USDashboard.HeaderContainer withoutInput>
                        <USDashboard.Header withoutPaddingRight>
                            Your chosen books
                        </USDashboard.Header>
                    </USDashboard.HeaderContainer>
                    <USDashboard.Books empty={!areThereBooks}>
                        {areThereBooks ? (
                            books.map(({ id, title, author, cover, price }) => (
                                <USComposed.Book
                                    key={id}
                                    id={id}
                                    title={title}
                                    author={author}
                                    cover={cover}
                                    price={price}
                                    withCart
                                />
                            ))
                        ) : (
                            <USDashboard.Warning>The cart is empty</USDashboard.Warning>
                        )}
                    </USDashboard.Books>
                </USDashboard.BooksContainer>
                <Dashboard.SummaryContainer></Dashboard.SummaryContainer>
            </>
        </UserCartContainer>
    )
}

export default UserCart
