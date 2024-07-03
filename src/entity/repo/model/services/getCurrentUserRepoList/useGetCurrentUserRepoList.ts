import { GetCurrentUserRepoListQueryVariables } from '@/entity/repo/model/services/getCurrentUserRepoList/getCurrentUserRepoList.gen.ts';
import getCurrentUserReposList from '@/entity/repo/model/services/getCurrentUserRepoList/getCurrentUserRepoList.graphql';
import {
    ICurrentUserViewer,
    IGetCurrentUserRepoListReturnType,
} from '@/entity/repo/model/services/getCurrentUserRepoList/getCurrentUserRepoListReturnType.ts';
import { reposListActions } from '@/entity/repo/model/slices/reposListSlice.ts';
import { IReposListItem } from '@/entity/repo/model/types/ReposListSheme.ts';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api';

export interface IGetCurrentUserRepoListAttrs {
    variables: GetCurrentUserRepoListQueryVariables;
    cursor?: string;
    action?: IGetCurrentUserReposListAttrsAction;
}

export interface IGetCurrentUserReposListAttrsAction {
    type: 'next' | 'prev';
    count: number;
}

export const useGetCurrentUserRepoList = () => {
    const dispatch = useAppDispatch();

    const getCurrentUserRepoList = async (
        attrs: IGetCurrentUserRepoListAttrs,
    ) => {
        const query = getCurrentUserReposList.loc!.source.body;

        // Первое получение (не по пагинации)
        if (!attrs.action) {
            const response = await $api.post<IGetCurrentUserRepoListReturnType>(
                '',
                {
                    query,
                    variables: attrs.variables,
                },
            );
            const data = response.data.data;

            const reposList = requestReposListToRedux(data.viewer);

            dispatch(reposListActions.setList(reposList ?? []));
            dispatch(
                reposListActions.setTotalReposCount(
                    data.viewer.repositories.totalCount,
                ),
            );
            dispatch(
                reposListActions.setStartCursor(
                    data.viewer.repositories.pageInfo.startCursor,
                ),
            );
            dispatch(
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
            const response = await $api.post<IGetCurrentUserRepoListReturnType>(
                '',
                {
                    query,
                    variables: { ...variables },
                },
            );

            const data = response.data.data;
            if (attrs.action.type === 'next') {
                variables.after = data.viewer.repositories.pageInfo.endCursor;
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
            dispatch(reposListActions.setList(reposList ?? []));
            dispatch(
                reposListActions.setTotalReposCount(
                    resultListData.data.viewer.repositories.totalCount,
                ),
            );
            dispatch(
                reposListActions.setStartCursor(
                    resultListData.data.viewer.repositories.pageInfo
                        .startCursor,
                ),
            );
            dispatch(
                reposListActions.setEndCursor(
                    resultListData.data.viewer.repositories.pageInfo.endCursor,
                ),
            );
            dispatch(
                reposListActions.setTotalReposCount(
                    resultListData.data.viewer.repositories.totalCount,
                ),
            );
        }
    };

    return getCurrentUserRepoList;
};

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
