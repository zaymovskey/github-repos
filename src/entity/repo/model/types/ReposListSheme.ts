export interface IReposListItem {
    name: string;
    starsCount: number;
    lasCommitedDate?: Date;
    url: string;
}

export interface IReposListScheme {
    isLoading: boolean;
    error?: string;
    data?: IReposListItem[];
}
