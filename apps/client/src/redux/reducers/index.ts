import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { apiFeedback } from './apiFeedback'
import { cart } from './cart'
import { chatDetails } from './chatDetails'
import { loader } from './loader'
import { socket } from './socket'

const cartConfig = {
   key: 'cart',
   storage,
}

const chatDetailsConfig = {
   key: 'chatDetails',
   storage,
}

export const rootReducer = combineReducers({
   socket,
   loader,
   apiFeedback,
   cart: persistReducer(cartConfig, cart),
   chatDetails: persistReducer(chatDetailsConfig, chatDetails),
})
