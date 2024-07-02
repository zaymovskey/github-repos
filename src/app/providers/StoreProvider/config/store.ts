import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from './reducersMap';
import { $api } from '@/shared/api';
import { localStorageMiddleware } from '../lib/localStorageMiddleware.ts';
import { reHydrateStore } from '@/app/providers/StoreProvider/lib/reHydrateStore.ts';

export function createReduxStore() {
    return configureStore({
        reducer: rootReducers,
        devTools: true,
        preloadedState: reHydrateStore(),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                    },
                },
            }).concat(localStorageMiddleware),
    });
}

export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
