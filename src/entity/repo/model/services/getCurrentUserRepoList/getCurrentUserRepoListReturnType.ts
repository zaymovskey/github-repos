export interface ICurrentUserViewer {
    repositories: {
        totalCount: number;
        nodes: [
            {
                id: string;
                name: string;
                stargazerCount: number;
                url: string;
                defaultBranchRef: {
                    target: {
                        history: {
                            nodes: [
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
    };
}

export interface IGetCurrentUserRepoListReturnType {
    data: {
        viewer: ICurrentUserViewer;
    };
}
