import {AnyAction, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
// import {loggerInstance} from '../../logger-instance';
// import {errorLoggingMiddleware} from '../error-logging-middleware';
import {api} from './api';

/**
 * Представляет корневой reducer приложения.
 */
const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
});

/**
 * Представляет хранилище приложения.
 */
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({serializableCheck: false, immutableCheck: true, thunk: true})
            .concat(api.middleware)
            // .concat(errorLoggingMiddleware(loggerInstance));
    },
});

/**
 * Представляет тип состояния приложения.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Представляет тип метода диспетчеризации хранилища.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Представляет вариант thunk для приложения, типизированный состоянием приложения {@link RootState} и не содержащий дополнительных
 * аргументов.
 */
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, AnyAction>;
