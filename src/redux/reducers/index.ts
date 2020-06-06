import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

import loader from './loader'

// const config = {
//     key: 'config',
//     storage
// }

const rootReducer = combineReducers({
    loader
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
