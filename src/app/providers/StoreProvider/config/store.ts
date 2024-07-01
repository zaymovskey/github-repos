import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from './reducersMap';
import { IStateScheme } from './StateScheme.ts';
import { $api } from '@/shared/api';

export function createReduxStore(initialState?: IStateScheme) {
    return configureStore({
        reducer: rootReducers,
        devTools: true,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                    },
                },
            }),
    });
}

export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
