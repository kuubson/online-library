import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import rootReducer from './reducers/rootReducer';

const middleware = [];

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, compose(
    applyMiddleware(...middleware)
));
export const persistor = persistStore(store);

