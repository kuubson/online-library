export * from './hooks'
export { t } from './i18/i18'
export * from './styles'

declare global {
   interface Window {
      FB: any
   }
}
