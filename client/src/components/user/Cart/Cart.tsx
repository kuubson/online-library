import { useState } from 'react'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { StoreContainer } from 'components/user/Store/Store'

import Books from 'components/user/Store/modules/Books/Books'
import StripePopup from './modules/StripePopup/StripePopup'

import * as StyledRegistration from 'components/guest/Registration/styled'
import * as StyledStore from 'components/user/Store/styled'
import * as Styled from './styled'

import { useCart } from './hooks'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)

type StyledProps = {
    empty?: boolean
}

const CartContainer = styled(StoreContainer)<StyledProps>``

interface ICart {
    shouldMenuExpand?: boolean
}

const Cart = ({ shouldMenuExpand }: ICart) => {
    const { books, price, createPayPalPayment } = useCart()
    const [shouldStripePopupAppear, setShouldStripePopupAppear] = useState(false)
    const areThereBooks = !!books.length
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
