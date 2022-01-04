import React, { useState } from 'react'
import styled from 'styled-components'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import { BookPopupContainer } from 'components/user/Store/modules/BookPopup'

import * as StyledStore from 'components/user/Store/styled'
import * as StyledRegistration from 'components/guest/Registration/styled'
import * as Styled from '../styled'

import { useCart, useIsKeyboardOpened } from 'hooks'

import { setLoading, setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const StripePopupContainer = styled(BookPopupContainer)``

interface IStripePopup {
    price: string | undefined
    setShouldStripePopupAppear: ReactDispatch<boolean>
}

const StripePopup: React.FC<IStripePopup> = ({ price, setShouldStripePopupAppear }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { cart, resetCart } = useCart()
    const isKeyboardOpened = useIsKeyboardOpened()
    const [error, setError] = useState('')
    const handlePurchase = async () => {
        try {
            const card = elements && elements.getElement(CardElement)
            if (stripe && card) {
                setLoading(true)
                const { paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card
                })
                if (paymentMethod) {
                    const url = '/api/user/cart/purchaseBooksWithStripe'
                    const response = await axios.post(url, {
                        paymentId: paymentMethod.id,
                        products: cart
                    })
                    if (response) {
                        setShouldStripePopupAppear(false)
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
                } else {
                    setLoading(false)
                }
            }
        } catch (error) {
            setLoading(false)
            setShouldStripePopupAppear(false)
        }
    }
    return (
        <StripePopupContainer>
            <StyledStore.ContentContainer withLessHeight isKeyboardOpened={isKeyboardOpened}>
                <StyledStore.Content withoutMargin>
                    <StyledStore.Header black>
                        Enter your details and submit payment
                    </StyledStore.Header>
                    <Styled.CardContainer>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        iconColor: '#0088ff',
                                        color: 'black',
                                        '::placeholder': {
                                            color: 'black'
                                        }
                                    }
                                },
                                hidePostalCode: true
                            }}
                            onChange={event =>
                                event.error ? setError(event.error.message) : setError('')
                            }
                        />
                    </Styled.CardContainer>
                    {error && <StyledRegistration.Error>{error}</StyledRegistration.Error>}
                    <StyledStore.ButtonsContainer>
                        <StyledStore.Button
                            onClick={() => setShouldStripePopupAppear(false)}
                            notAbsolute
                        >
                            Cancel
                        </StyledStore.Button>
                        <StyledStore.Button onClick={handlePurchase} notAbsolute withoutFixedWidth>
                            Submit ${price}
                        </StyledStore.Button>
                    </StyledStore.ButtonsContainer>
                </StyledStore.Content>
            </StyledStore.ContentContainer>
        </StripePopupContainer>
    )
}

export default StripePopup
