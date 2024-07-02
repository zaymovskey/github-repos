import { type FC } from 'react';
import { classNames } from '@/shared/lib';
import cls from './RepoCard.module.scss';
import { IReposListItem } from '../../model/types/ReposListSheme.ts';

interface IRepoCardProps {
    repo: IReposListItem;
    className?: string;
}

export const RepoCard: FC<IRepoCardProps> = ({ repo, className }) => {
    return (
        <div className={classNames(cls.repoCard, {}, [className])}>
            <a href="#" className={cls.repoName}>
                {repo.name}
            </a>
            <span className={cls.repoStars}>{repo.starsCount} ☆</span>
            <span>
                Дата последнего коммита:{' '}
                {repo.lasCommitedDate ?? 'Нет коммитов'}
            </span>
            <a href={repo.url} className={cls.repoLink}>
                Перейти к репозиторию на GitHub
            </a>
        </div>
    );
};
