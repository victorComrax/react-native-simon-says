import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import scoresReducer from './slices/scoresSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist'

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    scores: scoresReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
