import { createSlice } from '@reduxjs/toolkit';
import { IReposListSlice } from '../types/ReposListSheme.ts';

const initialState: IReposListSlice = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const repoSliceDetails = createSlice({
    name: 'repoSliceDetails',
    initialState,
    reducers: {},
});

export const { actions: repoDetailsActions } = repoSliceDetails;
export const { reducer: repoDetailsReducer } = repoSliceDetails;
