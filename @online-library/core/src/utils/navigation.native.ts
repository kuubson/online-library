import { CommonActions, createNavigationContainerRef } from '@react-navigation/native'

import type { Screen, Screens } from 'types'

export const navigationRef = createNavigationContainerRef<Screens>()

export const navigate = (screen: Screen, params?: Screens[Screen]) =>
   navigationRef.isReady() && navigationRef.current?.navigate(screen, params)

export const reset = (screen: Screen, params?: Screens[Screen]) =>
   navigationRef.isReady() &&
   navigationRef.current?.dispatch(
      CommonActions.navigate({
         name: screen,
         params,
      })
   )
