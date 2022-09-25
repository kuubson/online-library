import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import type { WebStorage } from 'redux-persist'
import { persistReducer } from 'redux-persist'

import { isWeb } from '@online-library/config'

import { apiFeedback } from './apiFeedback'
import { bookPopup } from './bookPopup'
import { cart } from './cart'
import { chatDetails } from './chatDetails'
import { loader } from './loader'
import { role } from './role'
import { socket } from './socket'

let storage: WebStorage | typeof AsyncStorage = AsyncStorage

if (isWeb) {
   // eslint-disable-next-line @typescript-eslint/no-var-requires
   storage = require('redux-persist/lib/storage').default
}

const cartConfig = {
   key: 'cart',
   storage,
}

const chatDetailsConfig = {
   key: 'chatDetails',
   storage,
}

export const coreReducer = combineReducers({
   socket,
   role,
   loader,
   apiFeedback,
   bookPopup,
   cart: persistReducer(cartConfig, cart),
   chatDetails: persistReducer(chatDetailsConfig, chatDetails),
})
