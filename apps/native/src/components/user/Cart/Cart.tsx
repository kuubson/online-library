import queryString from 'query-string'
import { useState } from 'react'
import WebView from 'react-native-webview'
import type { InferType } from 'yup'

import { API } from '@online-library/config'

import { t, usePaypalModal } from '@online-library/core'

import { useCart } from '@online-library/logic'

import * as Styled from './styled'
import { Header, Submit, Text } from 'components/shared/styled'

import { Books } from 'components/shared'

const { validation } = API['/api/user/cart/paypal/payment'].post

export const Cart = () => {
   const { setShowPayPalModal } = usePaypalModal()

   const [paymentId, setPaymentId] = useState('')
   const [PayerID, setPayerID] = useState('')

   const {
      books,
      price,
      paypalCheckoutLink,
      setPaypalCheckoutLink,
      areThereBooks,
      paypalCheckout,
   } = useCart({
      paymentId,
      PayerID,
   })

   return (
      <>
         {!!paypalCheckoutLink && (
            <WebView
               source={{ uri: paypalCheckoutLink }}
               onNavigationStateChange={data => {
                  const url = data.url.slice(data.url.indexOf('?'))

                  const { paymentId, PayerID } = queryString.parse(url) as InferType<
                     typeof validation
                  >

                  if (paymentId && PayerID) {
                     setPaypalCheckoutLink('')

                     setShowPayPalModal(false)

                     setPaymentId(paymentId)
                     setPayerID(PayerID)
                  }
               }}
               containerStyle={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  zIndex: 1,
               }}
            />
         )}
         <Books books={books} header={t('cart.header')} error={t('cart.empty')} withCart />
         {areThereBooks && (
            <Styled.SummaryContainer>
               <Header>{t('common.summary')}</Header>
               {books.map(({ id, title, price }, index) => (
                  <Styled.Summary key={id} last={index === books.length - 1}>
                     {`${t('common.book')} "${title}" 1 x ${price?.toFixed(2)}`}
                  </Styled.Summary>
               ))}
               <Submit>
                  <Text>
                     {t('buttons.pay')} ${price}
                  </Text>
               </Submit>
               <Styled.PayPalButton onPress={paypalCheckout}>
                  <Styled.ButtonText>{t('buttons.paypal')}</Styled.ButtonText>
               </Styled.PayPalButton>
            </Styled.SummaryContainer>
         )}
      </>
   )
}
