import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

import { API } from '@online-library/tools'

import { useCart } from 'hooks'

import { setApiFeedback, setLoading } from 'helpers'

import { apiAxios, history } from 'utils'

const { post } = API['/api/user/cart/stripe/payment']

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
               await apiAxios(post, {
                  paymentId: paymentMethod.id,
                  products: cart,
               }).then(() => {
                  setShouldStripePopupAppear(false)
                  setApiFeedback(post.header, post.errors[200], 'Check your profile', () => {
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
