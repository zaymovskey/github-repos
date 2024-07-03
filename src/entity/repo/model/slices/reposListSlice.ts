import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReposListItem, IReposListScheme } from '../types/ReposListSheme.ts';

const initialState: IReposListScheme = {
    isLoading: false,
    error: undefined,
    data: {
        totalReposCount: 0,
        list: [],
        currentPage: 1,
        endCursor: undefined,
        startCursor: undefined,
        searchQuery: '',
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
        setSearchQuery(state, action: PayloadAction<string>) {
            state.data.searchQuery = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const { actions: reposListActions } = reposListSlice;
export const { reducer: reposListReducer } = reposListSlice;
