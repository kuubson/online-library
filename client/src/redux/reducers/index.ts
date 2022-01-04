import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import socket from './socket'
import loader from './loader'
import apiFeedback from './apiFeedback'
import cart from './cart'
import messages from './messages'

const cartConfig = {
    key: 'cart',
    storage
}

const messagesConfig = {
    key: 'messages',
    storage
}

const rootReducer = combineReducers({
    socket,
    loader,
    apiFeedback,
    cart: persistReducer(cartConfig, cart),
    messages: persistReducer(messagesConfig, messages)
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
