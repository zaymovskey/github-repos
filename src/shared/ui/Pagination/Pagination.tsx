import { type FC } from 'react';
import { classNames } from '@/shared/lib';
import cls from './Pagination.module.scss';

interface IPaginationProps {
    className?: string;
    totalPages: number;
    currentPage: number;
    buttonsCount: number;
    onClickItem: (pageNumber: number) => void;
    loading?: boolean;
}

export const Pagination: FC<IPaginationProps> = ({
    className,
    totalPages,
    currentPage,
    buttonsCount,
    onClickItem,
    loading = false,
}) => {
    const getPageNumbers = (
        totalPages: number,
        currentPage: number,
        itemsCount: number,
    ): number[] => {
        let startPage: number = Math.max(
            1,
            currentPage - Math.floor(itemsCount / 2),
        );

        const endPage: number = Math.min(
            startPage + itemsCount - 1,
            totalPages,
        );

        startPage = Math.max(1, endPage - itemsCount + 1);
        const pageNumbers: number[] = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const pagesNumbers = getPageNumbers(totalPages, currentPage, buttonsCount);

    return (
        <div className={classNames(cls.pagination, {}, [className])}>
            {pagesNumbers.map((pageNumber) => (
                <button
                    className={classNames(
                        cls.paginationItem,
                        { [cls.current]: pageNumber === currentPage },
                        [],
                    )}
                    key={pageNumber}
                    onClick={() => onClickItem(pageNumber)}
                    disabled={loading}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};
