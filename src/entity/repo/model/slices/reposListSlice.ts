import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReposListItem, IReposListScheme } from '../types/ReposListSheme.ts';
import { getReposListThunk } from '../services/getReposList/getReposListThunk.ts';

const initialState: IReposListScheme = {
    isLoading: false,
    error: undefined,
    data: {
        totalReposCount: 0,
        list: [],
        currentPage: 1,
        endCursor: undefined,
        startCursor: undefined,
    },
};

export const reposListSlice = createSlice({
    name: 'reposListSlice',
    initialState,
    reducers: {
        setList(state, action: PayloadAction<IReposListItem[]>) {
            state.data.list = action.payload;
        },
        setTotalReposCount(state, action: PayloadAction<number>) {
            state.data.totalReposCount = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.data.currentPage = action.payload;
        },
        setEndCursor(state, action: PayloadAction<string>) {
            state.data.endCursor = action.payload;
        },
        setStartCursor(state, action: PayloadAction<string>) {
            state.data.startCursor = action.payload;
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
