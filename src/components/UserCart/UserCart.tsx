import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import hooks from 'hooks'

import { UserStoreContainer, IBook } from 'components/UserStore/UserStore'
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
                <USComposed.Books
                    books={books}
                    header="Your chosen books"
                    error="The cart is empty"
                    withCart
                    withMarginRight
                />
                <Dashboard.SummaryContainer></Dashboard.SummaryContainer>
            </>
        </UserCartContainer>
    )
}

export default UserCart
