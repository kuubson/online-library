import { createStore } from 'redux'
import { persistStore } from 'redux-persist'

import reducers from './reducers'

export const store = createStore(reducers)

export const persistor = persistStore(store)
