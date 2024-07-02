import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReposListItem, IReposListScheme } from '../types/ReposListSheme.ts';
import { getReposListThunk } from '../services/getReposList/getReposListThunk.ts';

const initialState: IReposListScheme = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const reposListSlice = createSlice({
    name: 'reposListSlice',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<IReposListItem[]>) {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReposListThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReposListThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(getReposListThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: reposListActions } = reposListSlice;
export const { reducer: reposListReducer } = reposListSlice;
