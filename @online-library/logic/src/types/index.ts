import type { WindowType } from '../../../../apps/web/src/components/App'

declare global {
   // eslint-disable-next-line @typescript-eslint/no-empty-interface
   interface Window extends WindowType {}
}
