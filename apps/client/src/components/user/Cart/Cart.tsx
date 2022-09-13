import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

import { REACT_APP_STRIPE_PUBLISHABLE_KEY } from 'config'

import * as Styled from './styled'
import { Header, HeaderContainer, Submit, UserContent } from 'components/shared/styled'

import { Books } from 'components/shared'

import { useCart } from './hooks'

import { StripePopup } from './modules/'

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY)

type CarsProps = {
   shouldMenuExpand?: boolean
}

export const Cart = ({ shouldMenuExpand }: CarsProps) => {
   const { books, price, paypalCheckout } = useCart()

   const [shouldStripePopupAppear, setShouldStripePopupAppear] = useState(false)

   const areThereBooks = !!books.length

   return (
      <Elements stripe={stripePromise} options={{ locale: 'en' }}>
         <UserContent shouldMenuExpand={shouldMenuExpand}>
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
