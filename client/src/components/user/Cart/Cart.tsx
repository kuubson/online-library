import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { gql, useQuery } from '@apollo/client'

import hooks from 'hooks'

import { StoreContainer } from 'components/user/Store/Store'

import UserStoreDashboard from 'components/user/Store/styled'
import GuestRegistrationDashboard from 'components/guest/Registration/styled'
import * as Styled from './styled'

import UserStoreComposed from 'components/user/Store/composed'
import Composed from './composed'

import utils from 'utils'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type CartQuery = {
    books: IBook[]
}

const cartQuery = gql`
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

type CartContainerType = {
    empty?: boolean
}

const CartContainer = styled(StoreContainer)<CartContainerType>``

interface ICart {
    shouldMenuExpand?: boolean
}

const Cart: React.FC<ICart> = ({ shouldMenuExpand }) => {
    const { paymentId, PayerID } = useRouter().query
    const { cart, resetCart } = useCart()
    const [shouldStripePopupAppear, setShouldStripePopupAppear] = useState(false)
    const { data } = useQuery<CartQuery>(cartQuery, {
        variables: {
            ids: cart
        }
    })
    const books = data ? data.books : []
    const price = books
        .map(({ price }) => price!)
        .reduce((total, price) => total + price, 0)
        .toFixed(2)
    const areThereBooks = !!books.length
    useEffect(() => {
        const executePayPalPayment = async () => {
            try {
                if (paymentId && PayerID) {
                    const url = '/api/user/cart/executePayPalPayment'
                    const response = await axios.post(url, {
                        paymentId,
                        PayerID
                    })
                    if (response) {
                        setApiFeedback(
                            'Submitting the order',
                            `You have successfully purchased new books`,
                            'Check them out in your profile',
                            () => {
                                resetCart()
                                history.push('/profile')
                            }
                        )
                    }
                }
            } catch (error: any) {
                if (error.response.status === 409) {
                    resetCart()
                    history.push('/profile')
                }
            }
        }
        executePayPalPayment()
    }, [paymentId, PayerID])
    const createPayPalPayment = async () => {
        const url = '/api/user/cart/createPayPalPayment'
        const response = await axios.post(url, {
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
            <CartContainer shouldMenuExpand={shouldMenuExpand} empty={!areThereBooks}>
                {shouldStripePopupAppear && (
                    <Composed.StripePopup
                        price={price}
                        setShouldStripePopupAppear={setShouldStripePopupAppear}
                    />
                )}
                <UserStoreComposed.Books
                    books={books}
                    header="Your chosen books"
                    error="The cart is empty"
                    withCart
                    withMarginRight={areThereBooks}
                    fullWidth={!areThereBooks}
                    withoutInput
                />
                {areThereBooks && (
                    <Styled.SummaryContainer>
                        <UserStoreDashboard.HeaderContainer withoutInput>
                            <UserStoreDashboard.Header>Summary</UserStoreDashboard.Header>
                        </UserStoreDashboard.HeaderContainer>
                        <Styled.Summary>
                            {books.map(({ id, title, price }) => (
                                <Styled.Book key={id}>
                                    Book "{title}" 1 x ${price?.toFixed(2)}
                                </Styled.Book>
                            ))}
                        </Styled.Summary>
                        <GuestRegistrationDashboard.Submit
                            onClick={() => setShouldStripePopupAppear(true)}
                            withLessMarginTop
                        >
                            Pay ${price}
                        </GuestRegistrationDashboard.Submit>
                        <Styled.PayPalButton onClick={createPayPalPayment}>
                            Pay with PayPal
                        </Styled.PayPalButton>
                    </Styled.SummaryContainer>
                )}
            </CartContainer>
        </Elements>
    )
}

export default Cart
