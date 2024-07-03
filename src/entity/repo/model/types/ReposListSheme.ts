export interface IReposListItem {
    id: string;
    name: string;
    starsCount: number;
    lasCommitedDate?: string;
    url: string;
}

export interface IReposListScheme {
    isLoading: boolean;
    error?: string;
    data: {
        totalReposCount: number;
        list: IReposListItem[];
        currentPage: number;
        endCursor?: string;
        startCursor?: string;
        searchQuery?: string;
    };
}
