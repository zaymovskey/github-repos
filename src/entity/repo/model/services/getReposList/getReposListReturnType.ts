export interface IGetReposListReturnType {
    data: {
        search: IRepoSearch;
    };
}

export interface IRepoSearch {
    repositoryCount: number;
    nodes?: [
        {
            id: string;
            name: string;
            stargazerCount: number;
            url: string;
            defaultBranchRef?: {
                target?: {
                    history: {
                        nodes?: [
                            {
                                committedDate: string;
                            },
                        ];
                    };
                };
            };
        },
    ];
    pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
        startCursor: string;
    };
}
