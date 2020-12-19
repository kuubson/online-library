import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import hooks from 'hooks'

import { UserStoreContainer } from 'components/UserStore/UserStore'
import USDashboard from 'components/UserStore/styled/Dashboard'
import URDashboard from 'components/UserRegistration/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import USComposed from 'components/UserStore/composed'
import Composed from './composed'

import utils from 'utils'
import apiAxios from 'utils/apiAxios'

const UserCartContainer = styled(UserStoreContainer)`
    justify-content: flex-start;
`

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const booksQuery = gql`
    query Books($ids: [ID!]!) {
        books(ids: $ids) {
            id
            title
            author
            cover
            price
        }
    }
`

const UserCart = ({ shouldExpandMenu }) => {
    const { paymentId, PayerID } = queryString.parse(useLocation().search)
    const { isLoading } = hooks.useLoader()
    const { cart, resetCart } = hooks.useCart()
    const [books, setBooks] = useState([])
    const [shouldStripePopupAppear, setShouldStripePopupAppear] = useState(false)
    const [isPaid, setIsPaid] = useState(false)
    const areThereBooks = books.length > 0
    const price = books
        .map(({ price }) => price)
        .reduce((total, price) => total + price, 0)
        .toFixed(2)
    useQuery(booksQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            ids: cart
        },
        onCompleted: ({ books }) => setBooks(books)
    })
    useEffect(() => {
        const executePayPalPayment = async () => {
            if (paymentId && PayerID) {
                const url = '/api/user/executePayPalPayment'
                const response = await utils.apiAxios.post(url, {
                    paymentId,
                    PayerID
                })
                if (response) {
                    setIsPaid(true)
                    utils.setIsLoading(false)
                    utils.setFeedbackData(
                        'Submitting the order',
                        `You have successfully purchased new books`,
                        'Check them out in your profile',
                        () => {
                            resetCart()
                            utils.redirectTo('/user/profile')
                        }
                    )
                }
            }
        }
        executePayPalPayment()
    }, [paymentId, PayerID])
    useEffect(() => {
        if (paymentId && PayerID && !isPaid) {
            utils.setIsLoading(true)
        }
    }, [isLoading, isPaid])
    const createPayPalPayment = async () => {
        const url = '/api/user/createPayPalPayment'
        const response = await apiAxios.post(url, {
            products: cart
        })
        if (response) {
            window.location = response.data.link
        }
    }
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
                        <Dashboard.PayPalButton onClick={createPayPalPayment}>
                            Pay with PayPal
                        </Dashboard.PayPalButton>
                    </Dashboard.SummaryContainer>
                )}
            </UserCartContainer>
        </Elements>
    )
}

export default UserCart
