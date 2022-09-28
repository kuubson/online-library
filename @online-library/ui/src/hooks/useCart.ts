import { useEffect, useState } from 'react'
import type { InferType } from 'yup'

import { API, isWeb } from '@online-library/config'

import {
   PaypalCheckoutResponse,
   ResponseError,
   apiAxios,
   callback,
   history,
   navigate,
   setApiFeedback,
   useBooksQuery,
   usePaypalModal,
   useCart as useReduxCart,
} from '@online-library/core'

const { request, validation, header, errors } = API['/api/user/cart/paypal/payment'].post

type UseCartProps = InferType<typeof validation>

export const useCart = ({ paymentId, PayerID }: UseCartProps) => {
   const { setShowPayPalModal } = usePaypalModal()

   const { cart, resetCart } = useReduxCart()

   const { data } = useBooksQuery({ variables: { ids: cart } })

   const books = data?.books || []

   const [paypalCheckoutLink, setPaypalCheckoutLink] = useState('')

   const [price, setPrice] = useState('')

   useEffect(() => {
      let total = 0

      books.map(({ price }) => (total += price || 0))

      setPrice(total.toFixed(2))
   }, [books])

   const reset = () => {
      resetCart()
      callback({
         web: () => history.push('/profile'),
         native: () => navigate('Profile'),
      })
   }

   useEffect(() => {
      const handlePaypalPayment = async () => {
         try {
            const response = await apiAxios<typeof validation>(request, {
               paymentId,
               PayerID,
            })
            if (response) {
               setApiFeedback(header, errors[200], 'Check profile tab', reset)
            }
         } catch (error) {
            if ((error as ResponseError).response?.status === 409) {
               reset()
            }
         }
      }

      if (paymentId && PayerID) {
         handlePaypalPayment()
      }
   }, [paymentId, PayerID])

   const paypalCheckout = async () => {
      const { validation, request } = API['/api/user/cart/paypal/checkout'].post

      const response = await apiAxios<typeof validation, PaypalCheckoutResponse>(request, {
         products: cart,
      })

      if (response) {
         const paypalCheckoutLink = response.data.link
         if (isWeb) {
            return (window.location.href = paypalCheckoutLink)
         }

         setPaypalCheckoutLink(paypalCheckoutLink)

         setShowPayPalModal(true)
      }
   }

   const areThereBooks = !!books.length

   return {
      books,
      paypalCheckoutLink,
      price,
      areThereBooks,
      setPaypalCheckoutLink,
      paypalCheckout,
   }
}
