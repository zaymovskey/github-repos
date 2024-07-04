export interface IRepo {
    id: string;
    name: string;
    starsCount: number;
    lasCommitedDate?: string;
    owner: {
        avatarUrl: string;
        login: string;
        url: string;
    };
    languages: string[];
    description: string;
}

export interface IRepoDetailsScheme {
    isLoading: boolean;
    error: string;
    data?: IRepo;
}
