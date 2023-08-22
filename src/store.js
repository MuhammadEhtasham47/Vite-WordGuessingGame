import { combineReducers, configureStore, } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import themeSlice from './redux/themeSlice';
import userSlice from './redux/userSlice';
import authSlice from './redux/authSlice';
import timeSlice from './redux/timeSlice';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice,
    theme: themeSlice,
    user: userSlice,
    time: timeSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     devTools: true,
// })

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


const persistor = persistStore(store)

export { store, persistor }