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
    const { loading: isCartLoading, data } = useQuery<CartQueryData>(cartQuery, {
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
            {!isCartLoading && (
                <>
                    <USComposed.Books
                        books={books}
                        header="Your chosen books"
                        error="The cart is empty"
                        withCart
                        withMarginRight={areThereBooks}
                        fullWidth={!areThereBooks}
                        withoutInput
                    />
                    {areThereBooks && (
                        <Dashboard.SummaryContainer>
                            <USDashboard.HeaderContainer withoutInput>
                                <USDashboard.Header>Summary</USDashboard.Header>
                            </USDashboard.HeaderContainer>
                            <Dashboard.Summary>
                                {books.map(({ id, title, price }) => (
                                    <Dashboard.Book key={id}>
                                        Book "{title}" 1 x ${price}
                                    </Dashboard.Book>
                                ))}
                            </Dashboard.Summary>
                        </Dashboard.SummaryContainer>
                    )}
                </>
            )}
        </UserCartContainer>
    )
}

export default UserCart
