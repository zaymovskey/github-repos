import { lazy } from 'react';

export const RepoCardPageLazy = lazy(
    async () => await import('./RepoCardPage'),
);
