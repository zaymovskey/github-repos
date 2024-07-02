import { type FC } from 'react';
import { classNames } from '@/shared/lib';
import cls from './ReposList.module.scss';
import { IReposListItem } from '../../model/types/ReposListSheme.ts';
import { RepoCard } from '@/entity/repo/ui/RepoCard/RepoCard.tsx';

interface IReposListProps {
    repos: IReposListItem[];
    className?: string;
}

export const ReposList: FC<IReposListProps> = ({ repos, className }) => {
    return (
        <div className={classNames(cls.reposList, {}, [className])}>
            {repos.map((repo) => (
                <RepoCard repo={repo} />
            ))}
        </div>
    );
};
