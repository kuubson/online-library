import { CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'

import { useIsKeyboardOpened } from '@online-library/core'

import * as Styled from './styled'
import { Button, Error, Header, PopupContainer } from 'components/shared/styled'
import * as StyledBookPopup from 'components/user/Store/modules/BookPopup/styled'

import { useStripePopup } from './hooks'

import { cardElementOptions } from './utils'

type StripePopupProps = {
   price: string | undefined
   setShouldStripePopupAppear: ReactDispatch<boolean>
}

export const StripePopup = ({ price, setShouldStripePopupAppear }: StripePopupProps) => {
   const isKeyboardOpened = useIsKeyboardOpened()

   const { handlePaying } = useStripePopup(setShouldStripePopupAppear)

   const [error, setError] = useState('')

   return (
      <PopupContainer>
         <StyledBookPopup.ContentContainer withLessHeight isKeyboardOpened={isKeyboardOpened}>
            <StyledBookPopup.Content withoutMargin>
               <Header black>Enter details and submit payment</Header>
               <Styled.CardContainer>
                  <CardElement
                     options={cardElementOptions}
                     onChange={event =>
                        event.error ? setError(event.error.message) : setError('')
                     }
                  />
               </Styled.CardContainer>
               {error && <Error>{error}</Error>}
               <StyledBookPopup.ButtonsContainer>
                  <Button onClick={() => setShouldStripePopupAppear(false)} notAbsolute>
                     Cancel
                  </Button>
                  <Button onClick={handlePaying} notAbsolute withoutFixedWidth>
                     Submit ${price}
                  </Button>
               </StyledBookPopup.ButtonsContainer>
            </StyledBookPopup.Content>
         </StyledBookPopup.ContentContainer>
      </PopupContainer>
   )
}
