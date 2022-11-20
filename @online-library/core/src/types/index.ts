import type { WindowType } from '../../../../apps/web/src/components/shared/Providers/Providers'

export * from './api'
export * from './axios'
export * from './common'
export * from './global'
export * from './navigation.native'

declare global {
   // eslint-disable-next-line @typescript-eslint/no-empty-interface
   interface Window extends WindowType {}
}
