/* eslint-disable @typescript-eslint/no-empty-interface */
import 'react-redux'

import { RootState } from 'redux/store'

import { theme } from 'styles'

declare module 'react-redux' {
   interface DefaultRootState extends RootState {}
}

type Theme = typeof theme

declare module 'styled-components' {
   export interface DefaultTheme extends Theme {}
}
