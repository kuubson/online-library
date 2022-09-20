import { theme } from 'styles'

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
