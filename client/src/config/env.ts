type Env = {
   NODE_ENV: 'development' | 'production'
   PUBLIC_URL: string
   REACT_APP_FACEBOOK_APP_ID: string
   REACT_APP_PUBLIC_VAPID_KEY: string
   REACT_APP_STRIPE_PUBLISHABLE_KEY: string
}

export const {
   NODE_ENV,
   PUBLIC_URL,
   REACT_APP_FACEBOOK_APP_ID,
   REACT_APP_PUBLIC_VAPID_KEY,
   REACT_APP_STRIPE_PUBLISHABLE_KEY,
} = process.env as unknown as Env
