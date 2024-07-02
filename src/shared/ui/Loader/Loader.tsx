import { type FC } from 'react';
import { classNames } from '@/shared/lib';
import cls from './Loader.module.scss';

interface ILoaderProps {
    className?: string;
}

export const Loader: FC<ILoaderProps> = ({ className }) => {
    return (
        <div className={classNames(cls.Loader, {}, [className])}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
