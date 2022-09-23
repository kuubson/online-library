import { useEffect, useState } from 'react'
import type { InferType } from 'yup'

import { API } from '@online-library/tools'

import { history, setApiFeedback, useCart as useCartHook } from '@online-library/core'

import { useGetBooksQuery } from 'gql'

import { useQueryParams } from 'hooks'

import { apiAxios } from 'utils'

import type { ApiError, PaypalCheckoutResponse } from 'types'

const { request, validation, header, errors } = API['/api/user/cart/paypal/payment'].post

export const useCart = () => {
   const { paymentId, PayerID } = useQueryParams() as InferType<typeof validation>

   const { cart, resetCart } = useCartHook()

   const { data } = useGetBooksQuery({ variables: { ids: cart } })

   const [price, setPrice] = useState('')

   const books = data?.books || []

   useEffect(() => {
      let total = 0

      books.map(({ price }) => (total += price || 0))

      setPrice(total.toFixed(2))
   }, [books])

   useEffect(() => {
      const handlePaypalPayment = async () => {
         try {
            if (paymentId && PayerID) {
               const response = await apiAxios<typeof validation>(request, {
                  paymentId,
                  PayerID,
               })
               if (response) {
                  setApiFeedback(header, errors[200], 'Check profile tab', () => {
                     resetCart()
                     history.push('/profile')
                  })
               }
            }
         } catch (error) {
            if ((error as ApiError).response?.status === 409) {
               resetCart()
               history.push('/profile')
            }
         }
      }
      handlePaypalPayment()
   }, [paymentId, PayerID])

   const paypalCheckout = async () => {
      const { validation, request } = API['/api/user/cart/paypal/checkout'].post

      const response = await apiAxios<typeof validation, PaypalCheckoutResponse>(request, {
         products: cart,
      })

      if (response) {
         window.location.href = response.data.link
      }
   }

   return {
      books,
      price,
      paypalCheckout,
   }
}
