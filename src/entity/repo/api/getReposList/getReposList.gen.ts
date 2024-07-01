import * as Types from '../../../../shared/api/models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetReposListQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetReposListQuery = { __typename?: 'Query', search: { __typename?: 'SearchResultItemConnection', nodes?: Array<{ __typename?: 'App' } | { __typename?: 'Discussion' } | { __typename?: 'Issue' } | { __typename?: 'MarketplaceListing' } | { __typename?: 'Organization' } | { __typename?: 'PullRequest' } | { __typename?: 'Repository', name: string, stargazerCount: number, url: any, defaultBranchRef?: { __typename?: 'Ref', target?: { __typename?: 'Blob' } | { __typename?: 'Commit', history: { __typename?: 'CommitHistoryConnection', nodes?: Array<{ __typename?: 'Commit', committedDate: any } | null> | null } } | { __typename?: 'Tag' } | { __typename?: 'Tree' } | null } | null } | { __typename?: 'User' } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const GetReposListDocument = gql`
    query getReposList($first: Int, $after: String) {
  search(
    type: REPOSITORY
    query: "is:public sort:updated"
    first: $first
    after: $after
  ) {
    nodes {
      ... on Repository {
        name
        stargazerCount
        url
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
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useGetReposListQuery__
 *
 * To run a query within a React component, call `useGetReposListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReposListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReposListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetReposListQuery(baseOptions?: Apollo.QueryHookOptions<GetReposListQuery, GetReposListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReposListQuery, GetReposListQueryVariables>(GetReposListDocument, options);
      }
export function useGetReposListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReposListQuery, GetReposListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReposListQuery, GetReposListQueryVariables>(GetReposListDocument, options);
        }
export function useGetReposListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReposListQuery, GetReposListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReposListQuery, GetReposListQueryVariables>(GetReposListDocument, options);
        }
export type GetReposListQueryHookResult = ReturnType<typeof useGetReposListQuery>;
export type GetReposListLazyQueryHookResult = ReturnType<typeof useGetReposListLazyQuery>;
export type GetReposListSuspenseQueryHookResult = ReturnType<typeof useGetReposListSuspenseQuery>;
export type GetReposListQueryResult = Apollo.QueryResult<GetReposListQuery, GetReposListQueryVariables>;
