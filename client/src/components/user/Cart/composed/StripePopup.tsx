import React, { useState } from 'react'
import styled from 'styled-components'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import hooks from 'hooks'

import { BookPopupContainer } from 'components/user/Store/composed/BookPopup'

import UserStoreDashboard from 'components/user/Store/styled'
import GuestRegistrationDashboard from 'components/guest/Registration/styled'
import * as Styled from '../styled'

import utils from 'utils'

const StripePopupContainer = styled(BookPopupContainer)``

interface IStripePopup {
    price: string | undefined
    setShouldStripePopupAppear: ReactDispatch<boolean>
}

const StripePopup: React.FC<IStripePopup> = ({ price, setShouldStripePopupAppear }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { cart, resetCart } = useCart()
    const [error, setError] = useState('')
    const handlePurchase = async () => {
        try {
            const card = elements && elements.getElement(CardElement)
            if (stripe && card) {
                utils.setLoading(true)
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
                    utils.setLoading(false)
                }
            }
        } catch (error) {
            utils.setLoading(false)
            setShouldStripePopupAppear(false)
        }
    }
    const isKeyboardOpened = useIsKeyboardOpened()
    return (
        <StripePopupContainer>
            <UserStoreDashboard.ContentContainer withLessHeight isKeyboardOpened={isKeyboardOpened}>
                <UserStoreDashboard.Content withoutMargin>
                    <UserStoreDashboard.Header black>
                        Enter your details and submit payment
                    </UserStoreDashboard.Header>
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
                    {error && (
                        <GuestRegistrationDashboard.Error>{error}</GuestRegistrationDashboard.Error>
                    )}
                    <UserStoreDashboard.ButtonsContainer>
                        <UserStoreDashboard.Button
                            onClick={() => setShouldStripePopupAppear(false)}
                            notAbsolute
                        >
                            Cancel
                        </UserStoreDashboard.Button>
                        <UserStoreDashboard.Button
                            onClick={handlePurchase}
                            notAbsolute
                            withoutFixedWidth
                        >
                            Submit ${price}
                        </UserStoreDashboard.Button>
                    </UserStoreDashboard.ButtonsContainer>
                </UserStoreDashboard.Content>
            </UserStoreDashboard.ContentContainer>
        </StripePopupContainer>
    )
}

export default StripePopup
