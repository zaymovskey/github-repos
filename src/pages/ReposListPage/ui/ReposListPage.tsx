import { type FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider';
import { getReposListThunk } from '@/entity/repo/model/services/getReposList/getReposListThunk.ts';
import { ReposList } from '@/entity/repo/ui/ReposList/ReposList.tsx';
import { Pagination } from '@/shared/ui';
import cls from './ReposListPage.module.scss';
import { reposListActions } from '@/entity/repo/model/slices/reposListSlice.ts';

const ITEMS_PER_PAGE = 10;

const ReposListPage: FC = () => {
    const dispatch = useAppDispatch();
    const { data: repos, isLoading } = useAppSelector(
        (state) => state.reposList,
    );

    useEffect(() => {
        dispatch(getReposListThunk({ first: ITEMS_PER_PAGE }));
    }, []);

    const onPaginationItemClick = (pageNumber: number) => {
        dispatch(reposListActions.setCurrentPage(pageNumber));
    };

    return (
        <div>
            <ReposList repos={repos.list} loading={isLoading} />
            <div className={cls.paginationBlock}></div>
            <Pagination
                currentPage={repos.currentPage}
                totalPages={Math.ceil(repos.totalReposCount / ITEMS_PER_PAGE)}
                buttonsCount={5}
                onClickItem={onPaginationItemClick}
            />
        </div>
    );
};

export default ReposListPage;
