import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { apiFeedback } from './apiFeedback'
import { cart } from './cart'
import { loader } from './loader'
import { messagesInfo } from './messagesInfo'
import { socket } from './socket'

const cartConfig = {
   key: 'cart',
   storage,
}

const messagesInfoConfig = {
   key: 'messagesInfo',
   storage,
}

export const rootReducer = combineReducers({
   socket,
   loader,
   apiFeedback,
   cart: persistReducer(cartConfig, cart),
   messagesInfo: persistReducer(messagesInfoConfig, messagesInfo),
})
