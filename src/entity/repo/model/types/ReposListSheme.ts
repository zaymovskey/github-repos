export interface IReposListItem {
    name: string;
    starsCount: number;
    lasCommitedDate?: string;
    url: string;
}

export interface IReposListScheme {
    isLoading: boolean;
    error?: string;
    data?: IReposListItem[];
}
