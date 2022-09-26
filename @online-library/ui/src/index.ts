export * from './hooks'
export { t } from './i18/i18'

declare global {
   interface Window {
      FB: any
   }
}
