import { useAppDispatch } from '@/app/providers/StoreProvider';
import getRepoByIdQuery from './getRepoById.graphql';
import { $api } from '@/shared/api';
import {
    IGetRepoByIdReturnType,
    IGetRepoByIdReturnTypeRepo,
} from '@/entity/repo/model/services/getRepoById/getRepoByIdReturnType.ts';
import { IRepo } from '@/entity/repo/model/types/RepoDetaisScheme.ts';
import { repoDetailsActions } from '@/entity/repo/model/slices/repoSliceDetails.ts';

export const useGetRepoById = () => {
    const dispatch = useAppDispatch();
    return async (id: string) => {
        const query = getRepoByIdQuery.loc!.source.body;
        const response = await $api.post<IGetRepoByIdReturnType>('', {
            query,
            variables: { id },
        });
        const repo = requestRepoToRedux(response.data.data.node);
        dispatch(repoDetailsActions.setData(repo));
    };
};

const requestRepoToRedux = (repo: IGetRepoByIdReturnTypeRepo): IRepo => {
    const lastCommitedDate =
        repo.defaultBranchRef?.target?.history.nodes?.[0].committedDate;

    return {
        id: repo.id,
        name: repo.name,
        starsCount: repo.stargazerCount,
        lasCommitedDate: lastCommitedDate,
        owner: repo.owner,
        description: repo.description,
        languages: repo.languages.nodes.map((lang) => lang.name),
    };
};
