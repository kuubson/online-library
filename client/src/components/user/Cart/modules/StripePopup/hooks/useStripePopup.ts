import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import { useCart } from 'hooks'

import { setLoading, setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

export const useStripePopup = (setShouldStripePopupAppear: ReactDispatch<boolean>) => {
    const stripe = useStripe()
    const elements = useElements()
    const { cart, resetCart } = useCart()
    const handlePaying = async () => {
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
    return {
        handlePaying
    }
}
