import { type FC } from 'react';
import { classNames } from '@/shared/lib';
import cls from './ReposList.module.scss';
import { IReposListItem } from '../../model/types/ReposListSheme.ts';
import { RepoCard } from '@/entity/repo/ui/RepoCard/RepoCard.tsx';
import { Loader } from '@/shared/ui';

interface IReposListProps {
    repos: IReposListItem[];
    className?: string;
    loading?: boolean;
}

export const ReposList: FC<IReposListProps> = ({
    repos,
    className,
    loading = false,
}) => {
    if (loading) {
        return (
            <div className={cls.loaderContainer}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={classNames(cls.reposList, {}, [className])}>
            {repos.map((repo) => (
                <RepoCard repo={repo} />
            ))}
        </div>
    );
};
