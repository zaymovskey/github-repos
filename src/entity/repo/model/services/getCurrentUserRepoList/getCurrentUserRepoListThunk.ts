import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import getCurrentUserReposList from './getCurrentUserRepoList.graphql';
import { IThunkConfig } from '@/app/providers/StoreProvider';
import { IReposListItem } from '../../types/ReposListSheme.ts';
import { reposListActions } from '../../slices/reposListSlice.ts';
import { GetCurrentUserRepoListQueryVariables } from '@/entity/repo/model/services/getCurrentUserRepoList/getCurrentUserRepoList.gen.ts';
import {
    ICurrentUserViewer,
    IGetCurrentUserRepoListReturnType,
} from '@/entity/repo/model/services/getCurrentUserRepoList/getCurrentUserRepoListReturnType.ts';

export interface getCurrentUserRepoListThunkAttrs {
    variables: GetCurrentUserRepoListQueryVariables;
    cursor?: string;
    action?: IGetReposListThunkAttrsAction;
}

export interface IGetReposListThunkAttrsAction {
    type: 'next' | 'prev';
    count: number;
}

export const getCurrentUserRepoListThunk = createAsyncThunk<
    void,
    getCurrentUserRepoListThunkAttrs,
    IThunkConfig<string>
>(
    'currentUserReposList/getCurrentUserReposListThunk',
    async (attrs, thunkAPI): Promise<void> => {
        try {
            const query = getCurrentUserReposList.loc!.source.body;

            // Первое получение (не по пагинации)
            if (!attrs.action) {
                const response =
                    await thunkAPI.extra.api.post<IGetCurrentUserRepoListReturnType>(
                        '',
                        {
                            query,
                            variables: attrs.variables,
                        },
                    );
                const data = response.data.data;

                const reposList = requestReposListToRedux(data.viewer);

                thunkAPI.dispatch(reposListActions.setList(reposList ?? []));
                thunkAPI.dispatch(
                    reposListActions.setTotalReposCount(
                        data.viewer.repositories.totalCount,
                    ),
                );
                thunkAPI.dispatch(
                    reposListActions.setStartCursor(
                        data.viewer.repositories.pageInfo.startCursor,
                    ),
                );
                thunkAPI.dispatch(
                    reposListActions.setEndCursor(
                        data.viewer.repositories.pageInfo.endCursor,
                    ),
                );
                return;
            }

            // Получение по пагинации
            let variables: GetCurrentUserRepoListQueryVariables;
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
            let resultListData: IGetCurrentUserRepoListReturnType | undefined;

            for (let i = attrs.action.count; i > 0; i--) {
                const response =
                    await thunkAPI.extra.api.post<IGetCurrentUserRepoListReturnType>(
                        '',
                        {
                            query,
                            variables: { ...variables },
                        },
                    );

                const data = response.data.data;
                if (attrs.action.type === 'next') {
                    variables.after =
                        data.viewer.repositories.pageInfo.endCursor;
                }
                if (attrs.action.type === 'prev') {
                    variables.before =
                        data.viewer.repositories.pageInfo.startCursor;
                }
                if (i === 1 || !data.viewer.repositories.pageInfo.hasNextPage) {
                    resultListData = response.data;
                }
            }

            if (resultListData) {
                const reposList = requestReposListToRedux(
                    resultListData.data.viewer,
                );
                thunkAPI.dispatch(reposListActions.setList(reposList ?? []));
                thunkAPI.dispatch(
                    reposListActions.setTotalReposCount(
                        resultListData.data.viewer.repositories.totalCount,
                    ),
                );
                thunkAPI.dispatch(
                    reposListActions.setStartCursor(
                        resultListData.data.viewer.repositories.pageInfo
                            .startCursor,
                    ),
                );
                thunkAPI.dispatch(
                    reposListActions.setEndCursor(
                        resultListData.data.viewer.repositories.pageInfo
                            .endCursor,
                    ),
                );
                thunkAPI.dispatch(
                    reposListActions.setTotalReposCount(
                        resultListData.data.viewer.repositories.totalCount,
                    ),
                );
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                thunkAPI.rejectWithValue(error.message);
                return;
            }
            throw error;
        }
    },
);

const requestReposListToRedux = (requestReposSearch: ICurrentUserViewer) => {
    const reposList: IReposListItem[] | undefined =
        requestReposSearch.repositories.nodes?.map((node) => {
            const lastCommitedDate =
                node.defaultBranchRef?.target?.history.nodes?.[0].committedDate;

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
