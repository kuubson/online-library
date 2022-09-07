import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

import { API } from 'online-library'

import { useCart } from 'hooks'

import { setApiFeedback, setLoading } from 'helpers'

import { axios, history } from 'utils'

const { header, post } = API.purchaseBooksWithStripe

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
               await axios
                  .post(API.purchaseBooksWithStripe.url, {
                     paymentId: paymentMethod.id,
                     products: cart,
                  })
                  .then(() => {
                     setShouldStripePopupAppear(false)
                     setApiFeedback(header, post[200], 'Check your profile', () => {
                        resetCart()
                        history.push('/profile')
                     })
                  })
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
