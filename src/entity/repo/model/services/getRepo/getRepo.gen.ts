import * as Types from '../../../../../shared/api/models.gen';

export type GetRepoQueryVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  owner: Types.Scalars['String']['input'];
}>;


export type GetRepoQuery = { __typename?: 'Query', repository?: { __typename?: 'Repository', stargazerCount: number, name: string, owner: { __typename?: 'Organization', login: string, avatarUrl: any } | { __typename?: 'User', login: string, avatarUrl: any }, defaultBranchRef?: { __typename?: 'Ref', target?: { __typename?: 'Blob' } | { __typename?: 'Commit', history: { __typename?: 'CommitHistoryConnection', nodes?: Array<{ __typename?: 'Commit', committedDate: any } | null> | null } } | { __typename?: 'Tag' } | { __typename?: 'Tree' } | null } | null } | null };
