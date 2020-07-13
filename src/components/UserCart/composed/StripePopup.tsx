import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import hooks from 'hooks'

import { BookPopupContainer } from 'components/UserStore/composed/BookPopup'
import USDashboard from 'components/UserStore/styled/Dashboard'
import URDashboard from 'components/UserRegistration/styled/Dashboard'
import Dashboard from '../styled/Dashboard'

import utils from 'utils'

interface IProps {
    price: string
    setShouldStripePopupAppear: React.Dispatch<React.SetStateAction<boolean>>
}

const StripePopupContainer = styled(BookPopupContainer)``

const StripePopup: React.FC<IProps> = ({ price, setShouldStripePopupAppear }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { cart, removeFromCart } = hooks.useCart()
    const [error, setError] = useState('')
    const [isKeyboardOpened, setIsKeyboardOpened] = useState(false)
    useEffect(() => {
        const initialHeight = window.innerHeight
        const handlePopupHeight = () =>
            setIsKeyboardOpened(utils.isMobile && initialHeight > window.innerHeight)
        window.addEventListener('resize', handlePopupHeight)
        return () => {
            window.removeEventListener('resize', handlePopupHeight)
        }
    }, [])
    const handlePurchase = async () => {
        try {
            const card = elements && elements.getElement(CardElement)
            if (stripe && card) {
                utils.setIsLoading(true)
                const { paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card
                })
                if (paymentMethod) {
                    console.log(paymentMethod)
                    const url = '/api/user/purchaseBooks'
                    const response = await utils.apiAxios.post(url, {
                        paymentId: paymentMethod.id,
                        products: cart
                    })
                    if (response) {
                        setShouldStripePopupAppear(false)
                        utils.setFeedbackData(
                            'Submitting the order',
                            `You have successfully purchased new books`,
                            'Check them out in your profile',
                            () => {
                                utils.redirectTo('/user/profile')
                                cart.map(id => removeFromCart(id))
                            }
                        )
                    }
                } else {
                    utils.setIsLoading(false)
                }
            }
        } catch (error) {
            utils.setIsLoading(false)
        }
    }
    return (
        <StripePopupContainer>
            <USDashboard.ContentContainer withLessHeight isKeyboardOpened={isKeyboardOpened}>
                <USDashboard.Content withoutMargin>
                    <USDashboard.Header black>
                        Enter your details and submit payment
                    </USDashboard.Header>
                    <Dashboard.CardContainer>
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
                            onChange={e => (e.error ? setError(e.error.message) : setError(''))}
                        />
                    </Dashboard.CardContainer>
                    {error && <URDashboard.Error>{error}</URDashboard.Error>}
                    <USDashboard.ButtonsContainer>
                        <USDashboard.Button
                            onClick={() => setShouldStripePopupAppear(false)}
                            notAbsolute
                        >
                            Cancel
                        </USDashboard.Button>
                        <USDashboard.Button onClick={handlePurchase} notAbsolute withoutFixedWidth>
                            Submit ${price}
                        </USDashboard.Button>
                    </USDashboard.ButtonsContainer>
                </USDashboard.Content>
            </USDashboard.ContentContainer>
        </StripePopupContainer>
    )
}

export default StripePopup
