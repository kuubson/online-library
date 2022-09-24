const email = {
   label: 'Email',
   placeholder: 'Enter email address...',
}

const password = {
   label: 'Password',
   placeholder: 'Enter password...',
}

export const en = {
   guest: {
      registration: {
         inputs: {
            name: {
               label: 'Name',
               placeholder: 'Enter name...',
            },
            email,
            password,
            repeatedPassword: {
               label: 'Repeat password',
               placeholder: 'Enter password again...',
            },
         },
         annotation1: "I haven't received the e-mail / activation link has expired",
         annotation2: 'I already have an account, go to login page',
      },
      login: {
         inputs: {
            email,
            password,
         },
         buttons: {
            login: 'Login',
            fbLogin: 'Login with Facebook',
         },
         annotation1: "I don't have an account yet, go to registration page",
         annotation2: 'I forgot password',
      },
   },
} as const
