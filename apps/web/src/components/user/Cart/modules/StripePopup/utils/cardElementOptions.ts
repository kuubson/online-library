import { theme } from '@online-library/core'

export const cardElementOptions = {
   style: {
      base: {
         iconColor: theme.colors.primary,
         color: 'black',
         '::placeholder': { color: 'black' },
      },
   },
   hidePostalCode: true,
}
