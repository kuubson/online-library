export const responses = {
   '422': { description: 'Data validation failed' },
   '429': { description: 'Too many requests' },
   '502@activation-link': { description: 'There was a problem sending the activation link' },
   '503@account-activated': { description: 'Account already activated' },
   '200@auth-token': { description: 'Auth token was set in cookies' },
   '404@incorrect-email-address': { description: 'Provided email address is incorrect' },
   '200@purchased-books': { description: 'Successfully purchased new books' },
   '404@books-not-available': { description: 'Selected books are not available anymore' },
   '409@books-already-purchased': {
      description: 'Selected books has been already purchased before',
   },
   '402@payment-failed': { description: 'Payment has failed' },
}
