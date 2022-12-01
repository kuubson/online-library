import type AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import type { WebStorage } from 'redux-persist'
import { persistReducer } from 'redux-persist'

import { apiFeedback } from './apiFeedback'
import { bookPopup } from './bookPopup'
import { cart } from './cart'
import { chatDetails } from './chatDetails'
import { loader } from './loader'
import { paypalModal } from './paypalModal'
import { role } from './role'
import { socket } from './socket'

export const coreReducer = (storage: WebStorage | typeof AsyncStorage) =>
   combineReducers({
      socket,
      role,
      loader,
      apiFeedback,
      paypalModal,
      bookPopup,
      cart: persistReducer(
         {
            key: 'cart',
            storage,
         },
         cart
      ),
      chatDetails: persistReducer(
         {
            key: 'chatDetails',
            storage,
         },
         chatDetails
      ),
   })
