import { CardElement } from '@stripe/react-stripe-js'
import styled from 'styled-components'

import { theme } from '@online-library/core'

export const Card = styled(CardElement).attrs(() => ({
   options: {
      style: {
         base: {
            iconColor: theme.colors.primary,
            color: 'black',
            '::placeholder': { color: 'black' },
         },
      },
      hidePostalCode: true,
   },
}))``
