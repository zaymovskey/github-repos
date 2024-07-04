import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRepoDetailsScheme } from '@/entity/repo';
import { IRepo } from '@/entity/repo/model/types/RepoDetaisScheme.ts';

const initialState: IRepoDetailsScheme = {
    isLoading: false,
    error: '',
    data: undefined,
};

export const repoSliceDetails = createSlice({
    name: 'repoSliceDetails',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<IRepo>) {
            state.data = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const { actions: repoDetailsActions } = repoSliceDetails;
export const { reducer: repoDetailsReducer } = repoSliceDetails;
