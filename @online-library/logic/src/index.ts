import type {} from 'react-hook-form'

export * from './hooks'

declare global {
   interface Window {
      FB: any
   }
}
