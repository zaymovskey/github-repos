import { type FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider';
import { ReposList } from '@/entity/repo/ui/ReposList/ReposList.tsx';
import { Pagination } from '@/shared/ui';
import cls from './ReposListPage.module.scss';
import { reposListActions } from '@/entity/repo/model/slices/reposListSlice.ts';
import {
    IUseGetReposListAttrsAction,
    useGetReposList,
} from '@/entity/repo/model/services/getReposList/useGetReposList.ts';
import { useGetCurrentUserRepoList } from '@/entity/repo/model/services/getCurrentUserRepoList/useGetCurrentUserRepoList.ts';
import { debounce } from 'lodash';

const ITEMS_PER_PAGE = 10;

const ReposListPage: FC = () => {
    const dispatch = useAppDispatch();
    const { data: repos, isLoading } = useAppSelector(
        (state) => state.reposList,
    );
    const getCurrentUserReposList = useGetCurrentUserRepoList();
    const getReposList = useGetReposList();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        // Первая загрузка
        dispatch(reposListActions.setIsLoading(true));
        if (repos.searchQuery !== '') {
            getReposList({
                variables: {
                    first: ITEMS_PER_PAGE,
                    ...(repos.currentPage !== 1 && {
                        before: repos.startCursor,
                    }),
                    query: repos.searchQuery,
                },
            }).then(() => {
                dispatch(reposListActions.setIsLoading(false));
            });
        } else {
            getCurrentUserReposList({
                variables: {
                    first: ITEMS_PER_PAGE,
                    ...(repos.currentPage !== 1 && {
                        before: repos.startCursor,
                    }),
                },
            }).then(() => {
                dispatch(reposListActions.setIsLoading(false));
            });
        }
    }, []);

    const onPaginationItemClick = (pageNumber: number) => {
        dispatch(reposListActions.setIsLoading(true));
        dispatch(reposListActions.setCurrentPage(pageNumber));
        const fetchAction: IUseGetReposListAttrsAction =
            repos.currentPage < pageNumber
                ? {
                      type: 'next',
                      count: pageNumber - repos.currentPage,
                  }
                : {
                      type: 'prev',
                      count: repos.currentPage - pageNumber,
                  };

        if (repos.searchQuery !== '') {
            getReposList({
                variables: {
                    first: ITEMS_PER_PAGE,
                    query: repos.searchQuery,
                },
                cursor:
                    fetchAction.type === 'next'
                        ? repos.endCursor
                        : repos.startCursor,
                action: fetchAction,
            }).then(() => {
                dispatch(reposListActions.setIsLoading(false));
            });
            return;
        }

        getCurrentUserReposList({
            variables: { first: ITEMS_PER_PAGE },
            cursor:
                fetchAction.type === 'next'
                    ? repos.endCursor
                    : repos.startCursor,
            action: fetchAction,
        }).then(() => {
            dispatch(reposListActions.setIsLoading(false));
        });
    };

    useEffect(() => {
        // Поиск
        dispatch(reposListActions.setCurrentPage(1));
        if (repos.searchQuery !== '') {
            getReposList({
                variables: { first: ITEMS_PER_PAGE, query: repos.searchQuery },
                cursor: repos.startCursor,
            }).then(() => {
                dispatch(reposListActions.setIsLoading(false));
            });
        } else {
            getCurrentUserReposList({
                variables: { first: ITEMS_PER_PAGE },
            }).then(() => {
                dispatch(reposListActions.setIsLoading(false));
            });
        }
    }, [dispatch, repos.searchQuery]);

    const debouncedSetSearchQueryRef = useRef(
        debounce(
            (query: string) => dispatch(reposListActions.setSearchQuery(query)),
            1500,
        ),
    );

    const onSearchInputChange = (query: string) => {
        dispatch(reposListActions.setIsLoading(true));
        debouncedSetSearchQueryRef.current(query);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Поиск"
                className={cls.searchInput}
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    onSearchInputChange(e.target.value);
                }}
            />
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
