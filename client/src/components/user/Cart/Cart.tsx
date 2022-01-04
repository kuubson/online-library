import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { gql, useQuery } from '@apollo/client'

import { StoreContainer } from 'components/user/Store/Store'

import Books from 'components/user/Store/modules/Books'
import StripePopup from './modules/StripePopup'

import * as StyledRegistration from 'components/guest/Registration/styled'
import * as StyledStore from 'components/user/Store/styled'
import * as Styled from './styled'

import { useQueryParams, useCart } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)

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

type Props = {
    empty?: boolean
}

const CartContainer = styled(StoreContainer)<Props>``

interface ICart {
    shouldMenuExpand?: boolean
}

const Cart = ({ shouldMenuExpand }: ICart) => {
    const { paymentId, PayerID } = useQueryParams()
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
                    <StripePopup
                        price={price}
                        setShouldStripePopupAppear={setShouldStripePopupAppear}
                    />
                )}
                <Books
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
                        <StyledStore.HeaderContainer withoutInput>
                            <StyledStore.Header>Summary</StyledStore.Header>
                        </StyledStore.HeaderContainer>
                        <Styled.Summary>
                            {books.map(({ id, title, price }) => (
                                <Styled.Book key={id}>
                                    Book "{title}" 1 x ${price?.toFixed(2)}
                                </Styled.Book>
                            ))}
                        </Styled.Summary>
                        <StyledRegistration.Submit
                            onClick={() => setShouldStripePopupAppear(true)}
                            withLessMarginTop
                        >
                            Pay ${price}
                        </StyledRegistration.Submit>
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
