import { useEffect, useState } from 'react'

import { API } from '@online-library/tools'

import { useGetBooksQuery } from 'gql'

import { useCart as useCartHook, useQueryParams } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

import type { ApiError, CreatePayPalPaymentResponse } from 'types'

export const useCart = () => {
   const { paymentId, PayerID } = useQueryParams()

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
      ;async () => {
         const { post } = API['/api/user/cart/paypal/payment'] // TODO: decide whether to add request config at API level
         try {
            if (paymentId && PayerID) {
               await apiAxios(post, {
                  paymentId,
                  PayerID,
               }).then(() => {
                  setApiFeedback(post.header, post.errors[200], 'Check your profile', () => {
                     resetCart()
                     history.push('/profile')
                  })
               })
            }
         } catch (error) {
            if ((error as ApiError).response?.status === 409) {
               resetCart()
               history.push('/profile')
            }
         }
      }
   }, [paymentId, PayerID])

   const createPayPalPayment = async () => {
      await apiAxios<CreatePayPalPaymentResponse>(API['/api/user/cart/paypal/checkout'].post, {
         products: cart,
      }).then(response => {
         window.location = response.data.link
      })
   }

   return {
      books,
      price,
      createPayPalPayment,
   }
}
