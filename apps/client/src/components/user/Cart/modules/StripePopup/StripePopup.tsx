import { CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import styled from 'styled-components/macro'

import * as Styled from './styled'

import * as StyledRegistration from 'components/guest/Registration/styled'
import { BookPopupContainer } from 'components/user/Store/modules/BookPopup/BookPopup'
import * as StyledBookPopup from 'components/user/Store/modules/BookPopup/styled'
import * as StyledStore from 'components/user/Store/styled'

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
      <StripePopupContainer>
         <StyledBookPopup.ContentContainer withLessHeight isKeyboardOpened={isKeyboardOpened}>
            <StyledBookPopup.Content withoutMargin>
               <StyledStore.Header black>Enter your details and submit payment</StyledStore.Header>
               <Styled.CardContainer>
                  <CardElement
                     options={cardElementOptions}
                     onChange={event =>
                        event.error ? setError(event.error.message) : setError('')
                     }
                  />
               </Styled.CardContainer>
               {error && <StyledRegistration.Error>{error}</StyledRegistration.Error>}
               <StyledBookPopup.ButtonsContainer>
                  <StyledStore.Button onClick={() => setShouldStripePopupAppear(false)} notAbsolute>
                     Cancel
                  </StyledStore.Button>
                  <StyledStore.Button onClick={handlePaying} notAbsolute withoutFixedWidth>
                     Submit ${price}
                  </StyledStore.Button>
               </StyledBookPopup.ButtonsContainer>
            </StyledBookPopup.Content>
         </StyledBookPopup.ContentContainer>
      </StripePopupContainer>
   )
}

const StripePopupContainer = styled(BookPopupContainer)``
