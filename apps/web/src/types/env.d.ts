/// <reference types="vite/client" />

interface ImportMetaEnv {
   VITE_FACEBOOK_APP_ID: string

   VITE_PUBLIC_VAPID_KEY: string

   VITE_STRIPE_PUBLISHABLE_KEY: string

   PUBLIC_URL: string

   NODE_ENV: 'development' | 'test' | 'production'
}
