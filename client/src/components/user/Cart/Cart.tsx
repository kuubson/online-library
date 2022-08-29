import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import styled from 'styled-components/macro'

import { REACT_APP_STRIPE_PUBLISHABLE_KEY } from 'config'

import * as Styled from './styled'

import * as StyledRegistration from 'components/guest/Registration/styled'
import { StoreContainer } from 'components/user/Store/Store'
import { Books } from 'components/user/Store/modules'
import * as StyledStore from 'components/user/Store/styled'

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
         <CartContainer shouldMenuExpand={shouldMenuExpand} empty={!areThereBooks}>
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
                  <StyledStore.HeaderContainer withoutInput>
                     <StyledStore.Header>Summary</StyledStore.Header>
                  </StyledStore.HeaderContainer>
                  <Styled.Summary>
                     {books.map(({ id, title, price }) => (
                        <Styled.Book key={id}>
                           {`Book "{${title}}" 1 x ${price?.toFixed(2)}`}
                        </Styled.Book>
                     ))}
                  </Styled.Summary>
                  <StyledRegistration.Submit
                     onClick={() => setShouldStripePopupAppear(true)}
                     withLessMarginTop
                  >
                     Pay ${price}
                  </StyledRegistration.Submit>
                  <Styled.PayPalButton onClick={createPayPalPayment}>
                     Pay with PayPal
                  </Styled.PayPalButton>
               </Styled.SummaryContainer>
            )}
         </CartContainer>
      </Elements>
   )
}

type CartContainerProps = {
   empty?: boolean
}

const CartContainer = styled(StoreContainer)<CartContainerProps>``
