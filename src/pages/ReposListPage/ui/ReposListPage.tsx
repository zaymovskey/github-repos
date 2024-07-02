import { type FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider';
import { getReposListThunk } from '@/entity/repo/model/services/getReposList/getReposListThunk.ts';
import { ReposList } from '@/entity/repo/ui/ReposList/ReposList.tsx';

const ReposListPage: FC = () => {
    const dispatch = useAppDispatch();
    const repos = useAppSelector((state) => state.reposList.data);

    useEffect(() => {
        dispatch(getReposListThunk({ first: 10 }));
    }, []);

    return (
        <div>
            <ReposList repos={repos} />
        </div>
    );
};

export default ReposListPage;
