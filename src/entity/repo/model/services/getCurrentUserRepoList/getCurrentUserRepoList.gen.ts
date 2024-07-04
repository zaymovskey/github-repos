import * as Types from '../../../../../shared/api/models.gen';

export type GetCurrentUserRepoListQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetCurrentUserRepoListQuery = { __typename?: 'Query', viewer: { __typename?: 'User', repositories: { __typename?: 'RepositoryConnection', totalCount: number, nodes?: Array<{ __typename?: 'Repository', id: string, name: string, stargazerCount: number, url: any, defaultBranchRef?: { __typename?: 'Ref', target?: { __typename?: 'Blob' } | { __typename?: 'Commit', history: { __typename?: 'CommitHistoryConnection', nodes?: Array<{ __typename?: 'Commit', committedDate: any } | null> | null } } | { __typename?: 'Tag' } | { __typename?: 'Tree' } | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, startCursor?: string | null, hasNextPage: boolean } } } };
