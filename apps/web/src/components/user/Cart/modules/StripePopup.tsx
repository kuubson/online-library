import { useState } from 'react'

import type { ReactDispatch } from '@online-library/core'
import { useIsKeyboardOpened } from '@online-library/core'

import * as Styled from '../styled/StripePopup'
import { ButtonsContainer, Content, ContentContainer } from 'components/shared/BookPopup/styled'
import { Button, Error, Header, PopupContainer } from 'components/shared/styled'

import { useStripePopup } from '../hooks'

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
         <ContentContainer withLessHeight isKeyboardOpened={isKeyboardOpened}>
            <Content withoutMargin>
               <Header black>Enter details and submit payment</Header>
               <Styled.CardContainer>
                  <Styled.Card
                     onChange={event =>
                        event.error ? setError(event.error.message) : setError('')
                     }
                  />
               </Styled.CardContainer>
               {error && <Error>{error}</Error>}
               <ButtonsContainer>
                  <Button onClick={() => setShouldStripePopupAppear(false)} notAbsolute>
                     Cancel
                  </Button>
                  <Button onClick={handlePaying} notAbsolute withoutFixedWidth>
                     Submit ${price}
                  </Button>
               </ButtonsContainer>
            </Content>
         </ContentContainer>
      </PopupContainer>
   )
}
