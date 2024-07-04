export interface IGetRepoByIdReturnTypeRepo {
    id: string;
    name: string;
    description: string;
    stargazerCount: number;
    owner: {
        avatarUrl: string;
        url: string;
        login: string;
    };
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
    languages: {
        nodes: {
            name: string;
        }[];
    };
}

export interface IGetRepoByIdReturnType {
    data: {
        node: IGetRepoByIdReturnTypeRepo;
    };
}
