import { IStateScheme } from '@/app/providers/StoreProvider';
import { Middleware } from '@reduxjs/toolkit';
import { reposListActions } from '@/entity/repo/model/slices/reposListSlice.ts';
import {
    CURRENT_PAGE,
    END_CURSOR,
    SEARCH_QUERY,
    START_CURSOR,
} from '@/shared/const/localStorage.ts';

export const localStorageMiddleware: Middleware<unknown, IStateScheme> = () => {
    return (next) => (action) => {
        const result = next(action);
        if (reposListActions.setCurrentPage.match(action)) {
            localStorage.setItem(CURRENT_PAGE, action.payload.toString());
        }
        if (reposListActions.setEndCursor.match(action)) {
            localStorage.setItem(END_CURSOR, action.payload);
        }
        if (reposListActions.setStartCursor.match(action)) {
            localStorage.setItem(START_CURSOR, action.payload);
        }
        if (reposListActions.setSearchQuery.match(action)) {
            localStorage.setItem(SEARCH_QUERY, action.payload);
        }
        return result;
    };
};
