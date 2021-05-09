import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import socket from './socket'
import loader from './loader'
import feedbackHandler from './feedbackHandler'
import cart from './cart'

const cartConfig = {
    key: 'cart',
    storage
}

const rootReducer = combineReducers({
    socket,
    loader,
    feedbackHandler,
    cart: persistReducer(cartConfig, cart)
})

export default rootReducer
