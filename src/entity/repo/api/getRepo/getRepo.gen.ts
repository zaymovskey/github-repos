import * as Types from '../../../../shared/api/models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetRepoQueryVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  owner: Types.Scalars['String']['input'];
}>;


export type GetRepoQuery = { __typename?: 'Query', repository?: { __typename?: 'Repository', stargazerCount: number, name: string, owner: { __typename?: 'Organization', login: string, avatarUrl: any } | { __typename?: 'User', login: string, avatarUrl: any }, defaultBranchRef?: { __typename?: 'Ref', target?: { __typename?: 'Blob' } | { __typename?: 'Commit', history: { __typename?: 'CommitHistoryConnection', nodes?: Array<{ __typename?: 'Commit', committedDate: any } | null> | null } } | { __typename?: 'Tag' } | { __typename?: 'Tree' } | null } | null } | null };


export const GetRepoDocument = gql`
    query getRepo($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    stargazerCount
    name
    owner {
      login
      avatarUrl
    }
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 1) {
            nodes {
              ... on Commit {
                committedDate
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetRepoQuery__
 *
 * To run a query within a React component, call `useGetRepoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepoQuery({
 *   variables: {
 *      name: // value for 'name'
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useGetRepoQuery(baseOptions: Apollo.QueryHookOptions<GetRepoQuery, GetRepoQueryVariables> & ({ variables: GetRepoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRepoQuery, GetRepoQueryVariables>(GetRepoDocument, options);
      }
export function useGetRepoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRepoQuery, GetRepoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRepoQuery, GetRepoQueryVariables>(GetRepoDocument, options);
        }
export function useGetRepoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRepoQuery, GetRepoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRepoQuery, GetRepoQueryVariables>(GetRepoDocument, options);
        }
export type GetRepoQueryHookResult = ReturnType<typeof useGetRepoQuery>;
export type GetRepoLazyQueryHookResult = ReturnType<typeof useGetRepoLazyQuery>;
export type GetRepoSuspenseQueryHookResult = ReturnType<typeof useGetRepoSuspenseQuery>;
export type GetRepoQueryResult = Apollo.QueryResult<GetRepoQuery, GetRepoQueryVariables>;