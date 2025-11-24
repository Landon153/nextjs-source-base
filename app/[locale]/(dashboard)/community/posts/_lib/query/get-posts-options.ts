import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import { StatusValues } from '@/app/[locale]/(dashboard)/community/posts/_lib/constants';
import type { GetPostsValues } from '@/app/[locale]/(dashboard)/community/posts/_lib/schema/get-posts-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getPosts } from '@/lib/services/default/features/posts';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type Post } from '@/lib/services/default/types/post';

export function getPostsOptions(
  queryParams: GetPostsValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<Post>>,
  Error,
  ApiResponse<PaginatedResponse<Post>>,
  (string | number | Date | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.Posts,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.Search],
      queryParams[QueryParamKey.SortBy],
      queryParams[QueryParamKey.From],
      queryParams[QueryParamKey.To],
      queryParams[QueryParamKey.Status],
    ],
    queryFn: () =>
      getPosts({
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        search_like: queryParams[QueryParamKey.Search],
        sortBy: queryParams[QueryParamKey.SortBy],
        withs: 'statistic,thumbnail',

        ...(queryParams[QueryParamKey.From] &&
          queryParams[QueryParamKey.To] && {
            createdAt_btw: [
              queryParams[QueryParamKey.From].toISOString(),
              queryParams[QueryParamKey.To].toISOString(),
            ].join(','),
          }),

        ...(queryParams[QueryParamKey.Status] &&
          queryParams[QueryParamKey.Status] !== StatusValues.All && {
            isShow_eq: queryParams[QueryParamKey.Status],
          }),
      }),
  });
}
