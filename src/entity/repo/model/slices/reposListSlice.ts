import { createSlice } from '@reduxjs/toolkit';
import { IRepoDetailsScheme } from '../types/RepoDetaisScheme.ts';

const initialState: IRepoDetailsScheme = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const reposListSlice = createSlice({
    name: 'reposListSlice',
    initialState,
    reducers: {},
});

export const { actions: reposListActions } = reposListSlice;
export const { reducer: reposListReducer } = reposListSlice;
