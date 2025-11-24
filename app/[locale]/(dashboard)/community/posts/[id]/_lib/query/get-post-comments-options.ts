import { type InfiniteData, infiniteQueryOptions, type UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

import { QueryKeys } from '@/lib/constants';
import { getComments } from '@/lib/services/default/features/posts';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import type { PaginatedResponse, PaginationQueryParams } from '@/lib/services/default/types/common';
import { type Comment } from '@/lib/services/default/types/post';

export function getPostCommentsOptions(
  postId: string | number,
  queryParams: PaginationQueryParams & { sortBy?: string },
): UseSuspenseInfiniteQueryOptions<
  ApiResponse<PaginatedResponse<Comment>>,
  Error,
  InfiniteData<ApiResponse<PaginatedResponse<Comment>>>,
  ApiResponse<PaginatedResponse<Comment>>,
  [QueryKeys.PostComments, string | number, PaginationQueryParams & { sortBy?: string }],
  number
> {
  return infiniteQueryOptions({
    queryKey: [QueryKeys.PostComments, postId, queryParams],
    queryFn: () => getComments(postId, { ...queryParams, withs: 'children.writer,statistic,writer' }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.status) {
        return undefined;
      }

      if (lastPage.data.meta.currentPage >= lastPage.data.meta.totalPages) {
        return undefined;
      }

      return lastPage.data.meta.currentPage + 1;
    },
  });
}
