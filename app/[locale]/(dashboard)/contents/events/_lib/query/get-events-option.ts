import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import { StatusValues } from '@/app/[locale]/(dashboard)/contents/events/_lib/constants';
import type { GetEventsValues } from '@/app/[locale]/(dashboard)/contents/events/_lib/schema/get-events-schema';
import { QueryKeys, QueryParamKey } from '@/lib/constants';
import { getEvents } from '@/lib/services/default/features/events';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type Event } from '@/lib/services/default/types/event';

export function getEventsOptions(
  queryParams: GetEventsValues,
): UseSuspenseQueryOptions<
  ApiResponse<PaginatedResponse<Event>>,
  Error,
  ApiResponse<PaginatedResponse<Event>>,
  (string | number | undefined)[]
> {
  return queryOptions({
    queryKey: [
      QueryKeys.Events,
      queryParams[QueryParamKey.Limit],
      queryParams[QueryParamKey.Page],
      queryParams[QueryParamKey.Search],
      queryParams[QueryParamKey.SortBy],
      queryParams[QueryParamKey.Status],
    ],
    queryFn: () =>
      getEvents({
        limit: queryParams[QueryParamKey.Limit],
        page: queryParams[QueryParamKey.Page],
        search_like: queryParams[QueryParamKey.Search],
        withs: 'file',
        sortBy: queryParams[QueryParamKey.SortBy],
        ...(queryParams[QueryParamKey.Status] &&
          queryParams[QueryParamKey.Status] !== StatusValues.All && { status_eq: queryParams[QueryParamKey.Status] }),
      }),
  });
}
