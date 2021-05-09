import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import socket from './socket'
import loader from './loader'
import feedbackHandler from './feedbackHandler'
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
    feedbackHandler,
    cart: persistReducer(cartConfig, cart),
    messages: persistReducer(messagesConfig, messages)
})

export default rootReducer
