import { GetReposListQueryVariables } from '@/entity/repo/model/services/getReposList/getReposList.gen.ts';
import getReposListQuery from '@/entity/repo/model/services/getReposList/getReposList.graphql';
import {
    IGetReposListReturnType,
    IRepoSearch,
} from '@/entity/repo/model/services/getReposList/getReposListReturnType.ts';
import { reposListActions } from '@/entity/repo/model/slices/reposListSlice.ts';
import { $api } from '@/shared/api';
import { IReposListItem } from '@/entity/repo/model/types/ReposListSheme.ts';
import { useAppDispatch } from '@/app/providers/StoreProvider';

export interface IUseGetReposListAttrs {
    variables: GetReposListQueryVariables;
    cursor?: string;
    action?: IUseGetReposListAttrsAction;
}

export interface IUseGetReposListAttrsAction {
    type: 'next' | 'prev';
    count: number;
}

export const useGetReposList = () => {
    const dispatch = useAppDispatch();

    const getReposList = async (attrs: IUseGetReposListAttrs) => {
        const query = getReposListQuery.loc!.source.body;

        // Первое получение (не по пагинации)
        if (!attrs.action) {
            const response = await $api.post<IGetReposListReturnType>('', {
                query,
                variables: attrs.variables,
            });
            const data = response.data.data;

            const reposList = requestReposListToRedux(data.search);

            dispatch(reposListActions.setList(reposList ?? []));
            dispatch(
                reposListActions.setTotalReposCount(
                    data.search.repositoryCount,
                ),
            );
            dispatch(
                reposListActions.setStartCursor(
                    data.search.pageInfo.startCursor,
                ),
            );
            dispatch(
                reposListActions.setEndCursor(data.search.pageInfo.endCursor),
            );
            return;
        }

        // Получение по пагинации
        let variables: GetReposListQueryVariables;
        if (attrs.action.type === 'next') {
            variables = {
                first: attrs.variables.first,
                after: attrs.cursor,
                query: attrs.variables.query,
            };
        } else {
            variables = {
                last: attrs.variables.first,
                before: attrs.cursor,
                query: attrs.variables.query,
            };
        }
        let resultListData: IGetReposListReturnType | undefined;

        for (let i = attrs.action.count; i > 0; i--) {
            const response = await $api.post<IGetReposListReturnType>('', {
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
            dispatch(reposListActions.setList(reposList ?? []));
            dispatch(
                reposListActions.setTotalReposCount(
                    resultListData.data.search.repositoryCount,
                ),
            );
            dispatch(
                reposListActions.setStartCursor(
                    resultListData.data.search.pageInfo.startCursor,
                ),
            );
            dispatch(
                reposListActions.setEndCursor(
                    resultListData.data.search.pageInfo.endCursor,
                ),
            );
            dispatch(
                reposListActions.setTotalReposCount(
                    resultListData.data.search.repositoryCount,
                ),
            );
        }

        return;
    };

    return getReposList;
};

const requestReposListToRedux = (requestReposSearch: IRepoSearch) => {
    const reposList: IReposListItem[] | undefined =
        requestReposSearch.nodes?.map((node) => {
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
