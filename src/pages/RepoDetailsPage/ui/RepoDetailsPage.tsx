import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRepoById } from '@/entity/repo/model/services/getRepoById/useGetRepoById.ts';
import { useAppSelector } from '@/app/providers/StoreProvider';
import cls from './RepoDetailsPage.module.scss';

const RepoDetailsPage: FC = () => {
    const { id: repoId } = useParams();
    const repo = useAppSelector((state) => state.repoDetails);
    const getRepoById = useGetRepoById();
    console.log(repo);

    useEffect(() => {
        if (repoId) {
            getRepoById(repoId);
        }
    }, []);

    return (
        <div className={cls.repoPage}>
            <h1 className={cls.repoTitle}>
                {repo.data?.name} - {repo.data?.starsCount} ☆ -{' '}
                {repo.data?.lasCommitedDate}
            </h1>
            <div className={cls.repoOwner}>
                <img src={repo.data?.owner.avatarUrl} alt="" />
                <a href={repo.data?.owner.url}>Перейти в профиль на GitHub</a>
            </div>
            <div className={cls.repoLangs}>
                {repo.data?.languages.map((lang) => <div>{lang}</div>)}
            </div>
            <div>{repo.data?.description}</div>
        </div>
    );
};

export default RepoDetailsPage;
