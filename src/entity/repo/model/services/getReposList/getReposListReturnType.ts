export interface IGetReposListReturnType {
    data: {
        search: {
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
            };
        };
    };
}
