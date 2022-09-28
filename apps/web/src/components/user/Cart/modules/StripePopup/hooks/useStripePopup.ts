import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

import { API } from '@online-library/config'

import type { ReactDispatch } from '@online-library/core'
import { apiAxios, history, setApiFeedback, setLoading, useCart } from '@online-library/core'

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
               card,
            })

            if (paymentMethod) {
               const { request, validation, header, errors } =
                  API['/api/user/cart/stripe/payment'].post

               const response = await apiAxios<typeof validation>(request, {
                  paymentId: paymentMethod.id,
                  products: cart,
               })

               if (response) {
                  setShouldStripePopupAppear(false)
                  setApiFeedback(header, errors[200], 'Check profile tab', () => {
                     resetCart()
                     history.push('/profile')
                  })
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

   return { handlePaying }
}
