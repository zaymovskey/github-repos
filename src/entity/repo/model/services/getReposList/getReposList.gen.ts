import * as Types from '../../../../../shared/api/models.gen';

export type GetReposListQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetReposListQuery = { __typename?: 'Query', search: { __typename?: 'SearchResultItemConnection', repositoryCount: number, nodes?: Array<{ __typename?: 'App' } | { __typename?: 'Discussion' } | { __typename?: 'Issue' } | { __typename?: 'MarketplaceListing' } | { __typename?: 'Organization' } | { __typename?: 'PullRequest' } | { __typename?: 'Repository', id: string, name: string, stargazerCount: number, url: any, defaultBranchRef?: { __typename?: 'Ref', target?: { __typename?: 'Blob' } | { __typename?: 'Commit', history: { __typename?: 'CommitHistoryConnection', nodes?: Array<{ __typename?: 'Commit', committedDate: any } | null> | null } } | { __typename?: 'Tag' } | { __typename?: 'Tree' } | null } | null } | { __typename?: 'User' } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };
