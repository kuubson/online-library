type Env = {
   REACT_APP_FACEBOOK_APP_ID: string

   REACT_APP_PUBLIC_VAPID_KEY: string

   REACT_APP_STRIPE_PUBLISHABLE_KEY: string

   PUBLIC_URL: string

   NODE_ENV: 'development' | 'production'
}

export const {
   REACT_APP_FACEBOOK_APP_ID,
   REACT_APP_PUBLIC_VAPID_KEY,
   REACT_APP_STRIPE_PUBLISHABLE_KEY,
   PUBLIC_URL,
   NODE_ENV,
} = process.env as unknown as Env
