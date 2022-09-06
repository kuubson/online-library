import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

import { REACT_APP_STRIPE_PUBLISHABLE_KEY } from 'config'

import * as Styled from './styled'
import * as SharedStyled from 'components/shared/styled'

import { Books } from 'components/shared'

import { useCart } from './hooks'

import { StripePopup } from './modules/'

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY)

type CarsProps = {
   shouldMenuExpand?: boolean
}

export const Cart = ({ shouldMenuExpand }: CarsProps) => {
   const { books, price, createPayPalPayment } = useCart()

   const [shouldStripePopupAppear, setShouldStripePopupAppear] = useState(false)

   const areThereBooks = !!books.length

   return (
      <Elements stripe={stripePromise} options={{ locale: 'en' }}>
         <SharedStyled.UserContent shouldMenuExpand={shouldMenuExpand}>
            {shouldStripePopupAppear && (
               <StripePopup price={price} setShouldStripePopupAppear={setShouldStripePopupAppear} />
            )}
            <Books
               books={books}
               header="Your chosen books"
               error="The cart is empty"
               withCart
               withMarginRight={areThereBooks}
               fullWidth={!areThereBooks}
               withoutInput
            />
            {areThereBooks && (
               <Styled.SummaryContainer>
                  <SharedStyled.HeaderContainer withoutInput>
                     <SharedStyled.Header>Summary</SharedStyled.Header>
                  </SharedStyled.HeaderContainer>
                  <Styled.Summary>
                     {books.map(({ id, title, price }) => (
                        <Styled.Book key={id}>
                           {`Book "{${title}}" 1 x ${price?.toFixed(2)}`}
                        </Styled.Book>
                     ))}
                  </Styled.Summary>
                  <SharedStyled.Submit
                     onClick={() => setShouldStripePopupAppear(true)}
                     withLessMarginTop
                  >
                     Pay ${price}
                  </SharedStyled.Submit>
                  <Styled.PayPalButton onClick={createPayPalPayment}>
                     Pay with PayPal
                  </Styled.PayPalButton>
               </Styled.SummaryContainer>
            )}
         </SharedStyled.UserContent>
      </Elements>
   )
}
