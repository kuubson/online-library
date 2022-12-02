import type AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import type { WebStorage } from 'redux-persist'
import { persistStore } from 'redux-persist'

import { coreReducer } from './reducers'

export let store = {} as ToolkitStore

export const getReduxSetup = (storage: WebStorage | typeof AsyncStorage) => {
   const newStore = configureStore({
      reducer: coreReducer(storage),
      middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
   })
   store = newStore
   return {
      store: newStore,
      persistor: persistStore(newStore),
   }
}

export type RootState = ReturnType<ReturnType<typeof getReduxSetup>['store']['getState']>

export type AppDispatch = ReturnType<typeof getReduxSetup>['store']['dispatch']
