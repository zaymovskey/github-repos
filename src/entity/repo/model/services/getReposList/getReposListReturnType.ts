export interface IGetReposListReturnType {
    data: {
        search: {
            nodes?: [
                {
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
