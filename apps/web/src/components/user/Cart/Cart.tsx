import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { InferType } from 'yup'

import { API } from '@online-library/config'

import { useCart } from '@online-library/ui'

import { REACT_APP_STRIPE_PUBLISHABLE_KEY } from 'config'

import * as Styled from './styled'
import { Header, HeaderContainer, Submit, UserContent } from 'components/shared/styled'

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
      <Elements stripe={stripePromise} options={{ locale: 'en' }}>
         <UserContent>
            {shouldStripePopupAppear && (
               <StripePopup price={price} setShouldStripePopupAppear={setShouldStripePopupAppear} />
            )}
            <Books
               books={books}
               header="List of books"
               error="The cart is empty"
               withCart
               withMarginRight={areThereBooks}
               fullWidth={!areThereBooks}
               withoutInput
            />
            {areThereBooks && (
               <Styled.SummaryContainer>
                  <HeaderContainer withoutInput>
                     <Header>Summary</Header>
                  </HeaderContainer>
                  <Styled.Summary>
                     {books.map(({ id, title, price }) => (
                        <Styled.Book key={id}>
                           {`Book "{${title}}" 1 x ${price?.toFixed(2)}`}
                        </Styled.Book>
                     ))}
                  </Styled.Summary>
                  <Submit onClick={() => setShouldStripePopupAppear(true)} withLessMarginTop>
                     Pay ${price}
                  </Submit>
                  <Styled.PayPalButton onClick={paypalCheckout}>
                     Pay with PayPal
                  </Styled.PayPalButton>
               </Styled.SummaryContainer>
            )}
         </UserContent>
      </Elements>
   )
}
