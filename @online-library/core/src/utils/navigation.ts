import { createNavigationContainerRef } from '@react-navigation/native'
import type { BrowserHistory } from 'history'
import { createBrowserHistory } from 'history'

import { isNative } from 'utils'

import type { Screen, Screens } from 'types'

export const history = (!isNative && createBrowserHistory()) as BrowserHistory

export const navigationRef = createNavigationContainerRef<Screens>()

export const navigate = (screen: Screen, params?: Screens[Screen]) =>
   navigationRef.isReady() && navigationRef.current?.navigate(screen, params)
