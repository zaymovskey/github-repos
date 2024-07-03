import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import getReposListQuery from './getReposList.graphql';
import { IThunkConfig } from '@/app/providers/StoreProvider';
import { GetReposListQueryVariables } from './getReposList.gen.ts';
import { IReposListItem } from '../../types/ReposListSheme.ts';
import {
    IGetReposListReturnType,
    IRepoSearch,
} from '@/entity/repo/model/services/getReposList/getReposListReturnType.ts';
import { reposListActions } from '../../slices/reposListSlice.ts';

export interface IGetReposListThunkAttrs {
    variables: GetReposListQueryVariables;
    cursor?: string;
    action?: IGetReposListThunkAttrsAction;
}

export interface IGetReposListThunkAttrsAction {
    type: 'next' | 'prev';
    count: number;
}

export const getReposListThunk = createAsyncThunk<
    void,
    IGetReposListThunkAttrs,
    IThunkConfig<string>
>('reposList/getReposListThunk', async (attrs, thunkAPI): Promise<void> => {
    const requestReposListToRedux = (requestReposSearch: IRepoSearch) => {
        const reposList: IReposListItem[] | undefined =
            requestReposSearch.nodes?.map((node) => {
                const lastCommitedDate =
                    node.defaultBranchRef?.target?.history.nodes?.[0]
                        .committedDate;

                return {
                    name: node.name,
                    starsCount: node.stargazerCount,
                    url: node.url,
                    lasCommitedDate: lastCommitedDate,
                    id: node.id,
                };
            });

        return reposList;
    };

    try {
        const query = getReposListQuery.loc!.source.body;
        if (!attrs.action) {
            const response =
                await thunkAPI.extra.api.post<IGetReposListReturnType>('', {
                    query,
                    variables: attrs.variables,
                });
            const data = response.data.data;

            const reposList = requestReposListToRedux(data.search);

            thunkAPI.dispatch(reposListActions.setList(reposList ?? []));
            thunkAPI.dispatch(
                reposListActions.setTotalReposCount(
                    data.search.repositoryCount,
                ),
            );
            thunkAPI.dispatch(
                reposListActions.setStartCursor(
                    data.search.pageInfo.startCursor,
                ),
            );
            thunkAPI.dispatch(
                reposListActions.setEndCursor(data.search.pageInfo.endCursor),
            );
        } else {
            let variables: GetReposListQueryVariables;
            if (attrs.action.type === 'next') {
                variables = {
                    first: attrs.variables.first,
                    after: attrs.cursor,
                };
            } else {
                variables = {
                    last: attrs.variables.first,
                    before: attrs.cursor,
                };
            }
            let resultListData: IGetReposListReturnType | undefined;

            for (let i = attrs.action.count; i > 0; i--) {
                const response =
                    await thunkAPI.extra.api.post<IGetReposListReturnType>('', {
                        query,
                        variables: { ...variables },
                    });

                const data = response.data.data;
                if (attrs.action.type === 'next') {
                    variables.after = data.search.pageInfo.endCursor;
                }
                if (attrs.action.type === 'prev') {
                    variables.before = data.search.pageInfo.startCursor;
                }
                if (i === 1 || !data.search.pageInfo.hasNextPage) {
                    resultListData = response.data;
                }
            }

            if (resultListData) {
                const reposList = requestReposListToRedux(
                    resultListData.data.search,
                );
                thunkAPI.dispatch(reposListActions.setList(reposList ?? []));
                thunkAPI.dispatch(
                    reposListActions.setTotalReposCount(
                        resultListData.data.search.repositoryCount,
                    ),
                );
                thunkAPI.dispatch(
                    reposListActions.setStartCursor(
                        resultListData.data.search.pageInfo.startCursor,
                    ),
                );
                thunkAPI.dispatch(
                    reposListActions.setEndCursor(
                        resultListData.data.search.pageInfo.endCursor,
                    ),
                );
            }
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            thunkAPI.rejectWithValue(error.message);
            return;
        }
        throw error;
    }
});
