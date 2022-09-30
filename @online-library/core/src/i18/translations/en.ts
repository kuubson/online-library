export const en = {
   common: {
      book: 'Book',
      summary: 'Summary',
      failedImageLoading: 'Image failed to load',
      failedVideoLoading: 'Video failed to load',
      noMessages: 'There are no messages',
      unreadBadge: 'Unread messages',
   },
   buttons: {
      login: 'Login',
      register: 'Register',
      remove: 'Remove',
      open: 'Open',
      close: 'Close',
      cancel: 'Cancel',
      confirm: 'Confirm',
      bookInCart: 'In cart',
      buy: 'Buy',
      borrow: 'Borrow',
      price: 'Price',
      fbLogin: 'Login with Facebook',
      resendEmail: 'Resend e-mail',
      recoverPassword: 'Recover password',
      changePassword: 'Change password',
      loadMore: 'Load more',
      return: 'Return',
      homePage: 'Home page',
      submit: 'Submit',
      pay: 'Pay',
      paypal: 'Pay with PayPal',
      play: 'Play',
      pause: 'Pause',
      send: 'Send',
      upload: 'Upload file',
      read: 'Read it',
      firstPage: 'First page',
      nextPage: 'Next page',
      previousPage: 'Previous page',
   },
   inputs: {
      name: {
         label: 'Name',
         placeholder: 'Enter name...',
      },
      email: {
         label: 'Email',
         placeholder: 'Enter email address...',
      },
      password: {
         label: 'Password',
         placeholder: 'Enter password...',
      },
      repeatedPassword: {
         label: 'Repeat password',
         placeholder: 'Enter password again...',
      },
      title: { placeholder: `Type book's title...` },
      author: { placeholder: `Type author's name...` },
      message: { placeholder: 'Enter message...' },
   },
   suggestionsInput: {
      findByAuthor: 'By author',
      findByTitle: 'By title',
      writtenBy: 'written by',
   },
   home: {
      advantage1: 'The largest resource of books in the internet',
      advantage2: 'Top books from top authors for free',
      advantage3: 'The lowest pricing for premium books',
   },
   registration: {
      annotation1: "I haven't received the e-mail / activation link has expired",
      annotation2: 'I already have an account, go to login page',
   },
   login: {
      annotation1: "I don't have an account yet, go to registration page",
      annotation2: 'I forgot password',
   },
   bookPopup: {
      confirmBorrowing: 'Confirm borrowing this book',
      confirmBuying: 'Confirm adding this book to the cart',
   },
   stripePopup: { header: 'Enter details and submit payment' },
   cart: {
      header: 'List of books',
      empty: 'The cart is empty',
   },
   store: {
      books: {
         free: {
            header: 'Find here awesome books',
            error: 'There are no free books in the library right now',
         },
         paid: {
            header: 'Choose some paid books',
            error: 'There are no paid books in the library right now',
         },
      },
      noBooks: 'There are no books in the library right now',
   },
   profile: {
      books: {
         paid: {
            header: 'Premium books',
            error: 'No premium books',
         },
         free: {
            header: 'Enjoy borrowed books',
            error: 'No borrowed books',
         },
      },
      noBooks: 'Go to store to get free books or buy some',
   },
} as const
