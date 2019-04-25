import { combineReducers } from 'redux'

import { user } from './user'
import { book } from './book'
import { cart } from './cart'

export default combineReducers({
    user,
    book,
    cart
});