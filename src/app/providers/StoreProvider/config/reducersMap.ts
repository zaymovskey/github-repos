import type { ReducersMapObject } from '@reduxjs/toolkit';
import { IStateScheme } from './StateScheme.ts';
import { repoDetailsReducer, reposListReducer } from '@/entity/repo';

export const rootReducers: ReducersMapObject<IStateScheme> = {
    reposList: reposListReducer,
    repoDetails: repoDetailsReducer,
};
