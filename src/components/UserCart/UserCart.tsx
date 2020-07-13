import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import hooks from 'hooks'

import { UserStoreContainer, IBook } from 'components/UserStore/UserStore'
import USDashboard from 'components/UserStore/styled/Dashboard'
import URDashboard from 'components/UserRegistration/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import USComposed from 'components/UserStore/composed'
import Composed from './composed'

interface IProps {
    shouldExpandMenu?: boolean
}

interface CartQueryData {
    cart: IBook[]
}

const UserCartContainer = styled(UserStoreContainer)`
    justify-content: flex-start;
`

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)

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
    const [shouldStripePopupAppear, setShouldStripePopupAppear] = useState(false)
    const price = books
        .map(({ price }) => price!)
        .reduce((total, price) => total + price, 0)
        .toFixed(2)
    return (
        <Elements
            stripe={stripePromise}
            options={{
                locale: 'en'
            }}
        >
            <UserCartContainer shouldExpandMenu={shouldExpandMenu}>
                {shouldStripePopupAppear && (
                    <Composed.StripePopup
                        price={price}
                        setShouldStripePopupAppear={setShouldStripePopupAppear}
                    />
                )}
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
                                    Book "{title}" 1 x ${price?.toFixed(2)}
                                </Dashboard.Book>
                            ))}
                        </Dashboard.Summary>
                        <URDashboard.Submit
                            onClick={() => setShouldStripePopupAppear(true)}
                            withLessMarginTop
                        >
                            Pay ${price}
                        </URDashboard.Submit>
                    </Dashboard.SummaryContainer>
                )}
            </UserCartContainer>
        </Elements>
    )
}

export default UserCart
