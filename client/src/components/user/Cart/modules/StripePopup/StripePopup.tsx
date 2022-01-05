import { useState } from 'react'
import styled from 'styled-components'
import { CardElement } from '@stripe/react-stripe-js'

import { BookPopupContainer } from 'components/user/Store/modules/BookPopup/BookPopup'

import * as StyledStore from 'components/user/Store/styled'
import * as StyledRegistration from 'components/guest/Registration/styled'
import * as Styled from './styled'

import { useIsKeyboardOpened } from 'hooks'
import { useStripePopup } from './hooks'

const StripePopupContainer = styled(BookPopupContainer)``

interface IStripePopup {
    price: string | undefined
    setShouldStripePopupAppear: ReactDispatch<boolean>
}

const StripePopup = ({ price, setShouldStripePopupAppear }: IStripePopup) => {
    const isKeyboardOpened = useIsKeyboardOpened()
    const { handlePaying } = useStripePopup(setShouldStripePopupAppear)
    const [error, setError] = useState('')
    return (
        <StripePopupContainer>
            <StyledStore.ContentContainer withLessHeight isKeyboardOpened={isKeyboardOpened}>
                <StyledStore.Content withoutMargin>
                    <StyledStore.Header black>
                        Enter your details and submit payment
                    </StyledStore.Header>
                    <Styled.CardContainer>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        iconColor: '#0088ff',
                                        color: 'black',
                                        '::placeholder': {
                                            color: 'black'
                                        }
                                    }
                                },
                                hidePostalCode: true
                            }}
                            onChange={event =>
                                event.error ? setError(event.error.message) : setError('')
                            }
                        />
                    </Styled.CardContainer>
                    {error && <StyledRegistration.Error>{error}</StyledRegistration.Error>}
                    <StyledStore.ButtonsContainer>
                        <StyledStore.Button
                            onClick={() => setShouldStripePopupAppear(false)}
                            notAbsolute
                        >
                            Cancel
                        </StyledStore.Button>
                        <StyledStore.Button onClick={handlePaying} notAbsolute withoutFixedWidth>
                            Submit ${price}
                        </StyledStore.Button>
                    </StyledStore.ButtonsContainer>
                </StyledStore.Content>
            </StyledStore.ContentContainer>
        </StripePopupContainer>
    )
}

export default StripePopup
