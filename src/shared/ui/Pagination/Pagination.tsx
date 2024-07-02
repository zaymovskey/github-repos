import { type FC } from 'react';
import { classNames } from '@/shared/lib';
import cls from './Pagination.module.scss';

interface IPaginationProps {
    className?: string;
}

export const Pagination: FC<IPaginationProps> = ({ className }) => {
    return <div className={classNames(cls.Pagination, {}, [className])}></div>;
};
