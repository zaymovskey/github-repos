import { lazy } from 'react';

export const ReposListPageLazy = lazy(
    async () => await import('./ReposListPage'),
);
