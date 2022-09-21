import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

import { coreReducer } from './reducers'

export const store = configureStore({
   reducer: coreReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
