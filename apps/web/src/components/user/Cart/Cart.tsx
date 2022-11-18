import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import type { InferType } from 'yup'

import { API } from '@online-library/config'

import { t } from '@online-library/core'

import { useCart } from '@online-library/logic'

import { REACT_APP_STRIPE_PUBLISHABLE_KEY } from 'config'

import { Header, HeaderContainer, Submit, UserContent } from 'styles/styled'

import * as Styled from './styled'

import { Books } from 'components/shared'

import { useQueryParams } from 'hooks'

import { StripePopup } from './modules/'

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY)

const { validation } = API['/api/user/cart/paypal/payment'].post

export const Cart = () => {
   const { paymentId, PayerID } = useQueryParams() as InferType<typeof validation>

   const { books, price, areThereBooks, paypalCheckout } = useCart({
      paymentId,
      PayerID,
   })

   const [shouldStripePopupAppear, setShouldStripePopupAppear] = useState(false)

   return (
      // TODO: set dynamic locale when i18 setup is done
      <Elements stripe={stripePromise} options={{ locale: 'en' }}>
         <UserContent>
            {shouldStripePopupAppear && (
               <StripePopup price={price} setShouldStripePopupAppear={setShouldStripePopupAppear} />
            )}
            <Books
               books={books}
               header={t('cart.header')}
               error={t('cart.empty')}
               withCart
               withMarginRight={areThereBooks}
               fullWidth={!areThereBooks}
               withoutInput
            />
            {areThereBooks && (
               <Styled.SummaryContainer>
                  <HeaderContainer withoutInput>
                     <Header>{t('common.summary')}</Header>
                  </HeaderContainer>
                  <Styled.Summary>
                     {books.map(({ id, title, price }) => (
                        <Styled.Book key={id}>
                           {`${t('common.book')} "${title}" 1 x ${price?.toFixed(2)}`}
                        </Styled.Book>
                     ))}
                  </Styled.Summary>
                  <Submit onClick={() => setShouldStripePopupAppear(true)} withLessMarginTop>
                     {t('buttons.pay')} ${price}
                  </Submit>
                  <Styled.PayPalButton onClick={paypalCheckout}>
                     {t('buttons.paypal')}
                  </Styled.PayPalButton>
               </Styled.SummaryContainer>
            )}
         </UserContent>
      </Elements>
   )
}
