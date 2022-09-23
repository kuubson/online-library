/* eslint-disable @typescript-eslint/no-empty-interface */
import type { RootState, theme } from '@online-library/tools'

declare module 'react-redux' {
   interface DefaultRootState extends RootState {}
}

type Theme = typeof theme

declare module 'styled-components' {
   export interface DefaultTheme extends Theme {}
}
