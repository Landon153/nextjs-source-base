import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { Filters } from '@/app/[locale]/(dashboard)/community/posts/_components/filters';
import { Posts } from '@/app/[locale]/(dashboard)/community/posts/_components/posts';
import { getPostsOptions } from '@/app/[locale]/(dashboard)/community/posts/_lib/query/get-posts-options';
import {
  getPostsSchema,
  type GetPostsValues,
} from '@/app/[locale]/(dashboard)/community/posts/_lib/schema/get-posts-schema';
import { QueryParamKey } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { extractParams, validateParams } from '@/lib/query-params';
import { type SearchParams } from '@/lib/types/common';

export const metadata: Metadata = {
  title: '게시글 관리',
};

export default function CommunityPostListPage({ searchParams }: { searchParams: SearchParams }): JSX.Element {
  const extractedParams = extractParams<GetPostsValues>(searchParams, [
    QueryParamKey.From,
    QueryParamKey.To,
    QueryParamKey.Search,
    QueryParamKey.Page,
    QueryParamKey.Limit,
    QueryParamKey.Status,
    QueryParamKey.SortBy,
  ]);
  const { validatedParams, defaultParams } = validateParams(getPostsSchema, extractedParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getPostsOptions(validatedParams));

  return (
    <Main
      breadcrumbs={[
        { href: '/community/posts', label: '커뮤니티 관리' },
        { href: '/community/posts', label: '게시글 관리' },
      ]}
      className="space-y-7"
    >
      <Filters validatedParams={validatedParams} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts hasFilter={!isEqual(defaultParams, validatedParams)} validatedParams={validatedParams} />
      </HydrationBoundary>
    </Main>
  );
}
