import { IStateScheme } from '@/app/providers/StoreProvider';
import { Middleware } from '@reduxjs/toolkit';
import { reposListActions } from '@/entity/repo/model/slices/reposListSlice.ts';
import { CURRENT_PAGE } from '@/shared/const/localStorage.ts';

export const localStorageMiddleware: Middleware<unknown, IStateScheme> = () => {
    return (next) => (action) => {
        const result = next(action);
        if (reposListActions.setCurrentPage.match(action)) {
            localStorage.setItem(CURRENT_PAGE, action.payload.toString());
        }
        return result;
    };
};
