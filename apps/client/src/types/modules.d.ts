/* eslint-disable @typescript-eslint/no-empty-interface */
import 'react-redux'

import type { RootState } from 'redux/store'

import type { theme } from 'styles'

declare module 'react-redux' {
   interface DefaultRootState extends RootState {}
}

type Theme = typeof theme

declare module 'styled-components' {
   export interface DefaultTheme extends Theme {}
}
