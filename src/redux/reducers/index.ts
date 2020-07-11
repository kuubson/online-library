import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import loader from './loader'
import feedbackHandler from './feedbackHandler'
import cart from './cart'

const cartConfig = {
    key: 'cart',
    storage
}

const rootReducer = combineReducers({
    loader,
    feedbackHandler,
    cart: persistReducer(cartConfig, cart)
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
