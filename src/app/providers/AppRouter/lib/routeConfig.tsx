import { type RouteProps } from 'react-router-dom';
import { ReposListPage } from '@/pages/ReposListPage';
import { RepoCardPage } from '@/pages/RepoCardPage';

export enum EnumAppRoutes {
    REPOS_LIST = 'repos_list',
    REPO_CARD = 'repo_card',
}

export const RoutePath: Record<EnumAppRoutes, string> = {
    [EnumAppRoutes.REPOS_LIST]: '/',
    [EnumAppRoutes.REPO_CARD]: '/repo-card',
};

export const RouteConfig: Record<EnumAppRoutes, RouteProps> = {
    [EnumAppRoutes.REPOS_LIST]: {
        path: RoutePath.repos_list,
        element: <ReposListPage />,
    },
    [EnumAppRoutes.REPO_CARD]: {
        path: RoutePath.repo_card,
        element: <RepoCardPage />,
    },
};
