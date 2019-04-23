import { combineReducers } from 'redux'

import { user } from './user'
import { book } from './book'

export default combineReducers({
    user,
    book
});