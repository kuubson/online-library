import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import socket from './socket'
import loader from './loader'
import apiFeedback from './apiFeedback'
import cart from './cart'
import messagesInfo from './messagesInfo'

const cartConfig = {
    key: 'cart',
    storage
}

const messagesInfoConfig = {
    key: 'messagesInfo',
    storage
}

export const rootReducer = combineReducers({
    socket,
    loader,
    apiFeedback,
    cart: persistReducer(cartConfig, cart),
    messagesInfo: persistReducer(messagesInfoConfig, messagesInfo)
})
