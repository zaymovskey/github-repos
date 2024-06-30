import { type FC } from 'react';
import cls from './RepoCardPage.module.scss';
// import { classNames } from 'src';

interface IRepoCardPageProps {
    className?: string;
}

export const RepoCardPage: FC<IRepoCardPageProps> = ({ className }) => {
    console.log(dsafasdf);
    return (
        <div className={classNames(cls.RepoCardPage, {}, [className])}></div>
    );
};
