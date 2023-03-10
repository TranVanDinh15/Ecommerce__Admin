import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(rootReducer, applyMiddleware(thunk));
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
export default store;
export { persistor };
