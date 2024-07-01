import { lazy } from 'react';

export const RepoDetailsPageLazy = lazy(
    async () => await import('./RepoDetailsPage.tsx'),
);
