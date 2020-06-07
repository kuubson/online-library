import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

import loader from './loader'
import feedbackHandler from './feedbackHandler'

// const config = {
//     key: 'config',
//     storage
// }

const rootReducer = combineReducers({
    loader,
    feedbackHandler
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
