import { type FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider';
import {
    getReposListThunk,
    IGetReposListThunkAttrsAction,
} from '@/entity/repo/model/services/getReposList/getReposListThunk.ts';
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
        dispatch(
            getReposListThunk({
                variables: { first: ITEMS_PER_PAGE, before: repos.startCursor },
            }),
        );
    }, []);

    const onPaginationItemClick = (pageNumber: number) => {
        dispatch(reposListActions.setCurrentPage(pageNumber));
        const fetchAction: IGetReposListThunkAttrsAction =
            repos.currentPage < pageNumber
                ? {
                      type: 'next',
                      count: pageNumber - repos.currentPage,
                  }
                : {
                      type: 'prev',
                      count: repos.currentPage - pageNumber,
                  };
        dispatch(
            getReposListThunk({
                variables: { first: ITEMS_PER_PAGE },
                cursor:
                    fetchAction.type === 'next'
                        ? repos.endCursor
                        : repos.startCursor,
                action: fetchAction,
            }),
        );
    };

    return (
        <div>
            <ReposList repos={repos.list} loading={isLoading} />
            <div className={cls.paginationBlock}>
                <Pagination
                    currentPage={repos.currentPage}
                    totalPages={Math.ceil(
                        repos.totalReposCount / ITEMS_PER_PAGE,
                    )}
                    buttonsCount={5}
                    onClickItem={onPaginationItemClick}
                />
            </div>
        </div>
    );
};

export default ReposListPage;
