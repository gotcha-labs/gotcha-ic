import rootReducer from './reducer';

import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ==============================|| REDUX - MAIN STORE ||============================== //


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','customization','account'],
    blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(initialState) {
    const store = createStore(persistedReducer, initialState, composeEnhancers());
    return store;
}

const store = configureStore();

const persistor = persistStore(store);

export { store, persistor };