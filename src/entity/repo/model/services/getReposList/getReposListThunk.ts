import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import getReposListQuery from './getReposList.graphql';
import { IThunkConfig } from '@/app/providers/StoreProvider';
import {
    GetReposListQuery,
    GetReposListQueryVariables,
} from './getReposList.gen.ts';

export const getReposListThunk = createAsyncThunk<
    GetReposListQuery,
    GetReposListQueryVariables,
    IThunkConfig<string>
>('reposList/getReposListThunk', async (variables, thunkAPI) => {
    try {
        const query = getReposListQuery.loc!.source.body;
        const response = await thunkAPI.extra.api.post<GetReposListQuery>('', {
            query,
            variables,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return thunkAPI.rejectWithValue(error.message);
        }
        throw error;
    }
});
