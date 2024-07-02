import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import getReposListQuery from './getReposList.graphql';
import { IThunkConfig } from '@/app/providers/StoreProvider';
import { GetReposListQueryVariables } from './getReposList.gen.ts';
import { IReposListItem } from '../../types/ReposListSheme.ts';
import { IGetReposListReturnType } from '@/entity/repo/model/services/getReposList/getReposListReturnType.ts';
import { reposListActions } from '../../slices/reposListSlice.ts';

export const getReposListThunk = createAsyncThunk<
    void,
    GetReposListQueryVariables,
    IThunkConfig<string>
>('reposList/getReposListThunk', async (variables, thunkAPI): Promise<void> => {
    try {
        const query = getReposListQuery.loc!.source.body;
        const response = await thunkAPI.extra.api.post<IGetReposListReturnType>(
            '',
            {
                query,
                variables,
            },
        );
        const data = response.data.data;

        const reposList: IReposListItem[] | undefined = data.search.nodes?.map(
            (node) => {
                const lastCommitedDate =
                    node.defaultBranchRef?.target?.history.nodes?.[0]
                        .committedDate;

                return {
                    name: node.name,
                    starsCount: node.stargazerCount,
                    url: node.url,
                    lasCommitedDate: lastCommitedDate,
                };
            },
        );

        thunkAPI.dispatch(reposListActions.setData(reposList ?? []));
    } catch (error) {
        if (error instanceof AxiosError) {
            thunkAPI.rejectWithValue(error.message);
            return;
        }
        throw error;
    }
});
