import { CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'

import * as Styled from './styled'
import * as SharedStyled from 'components/shared/styled'
import * as StyledBookPopup from 'components/user/Store/modules/BookPopup/styled'

import { useIsKeyboardOpened } from 'hooks'

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
      <SharedStyled.PopupContainer>
         <StyledBookPopup.ContentContainer withLessHeight isKeyboardOpened={isKeyboardOpened}>
            <StyledBookPopup.Content withoutMargin>
               <SharedStyled.Header black>
                  Enter your details and submit payment
               </SharedStyled.Header>
               <Styled.CardContainer>
                  <CardElement
                     options={cardElementOptions}
                     onChange={event =>
                        event.error ? setError(event.error.message) : setError('')
                     }
                  />
               </Styled.CardContainer>
               {error && <SharedStyled.Error>{error}</SharedStyled.Error>}
               <StyledBookPopup.ButtonsContainer>
                  <SharedStyled.Button
                     onClick={() => setShouldStripePopupAppear(false)}
                     notAbsolute
                  >
                     Cancel
                  </SharedStyled.Button>
                  <SharedStyled.Button onClick={handlePaying} notAbsolute withoutFixedWidth>
                     Submit ${price}
                  </SharedStyled.Button>
               </StyledBookPopup.ButtonsContainer>
            </StyledBookPopup.Content>
         </StyledBookPopup.ContentContainer>
      </SharedStyled.PopupContainer>
   )
}
