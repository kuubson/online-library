import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { global } from './reducers/global'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['shouldBookUploaderAppear', 'shouldStoreModalAppear', 'storeModalData', 'isLoading']
}

const reducers = combineReducers({
    global: persistReducer(persistConfig, global)
})

export const store = createStore(reducers, composeWithDevTools(
    applyMiddleware()
))
export const persistor = persistStore(store)

