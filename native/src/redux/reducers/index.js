import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import socket from './socket'
import loader from './loader'
import feedbackHandler from './feedbackHandler'
import bookPopup from './bookPopup'
import cart from './cart'
import payPalModal from './payPalModal'
import messages from './messages'

const cartConfig = {
    key: 'cart',
    storage: AsyncStorage
}

const messagesConfig = {
    key: 'messages',
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    socket,
    loader,
    feedbackHandler,
    bookPopup,
    cart: persistReducer(cartConfig, cart),
    payPalModal,
    messages: persistReducer(messagesConfig, messages)
})

export default rootReducer
