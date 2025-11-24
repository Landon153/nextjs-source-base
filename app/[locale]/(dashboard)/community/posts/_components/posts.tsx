'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/community/posts/_components/datatable';
import { getPostsOptions } from '@/app/[locale]/(dashboard)/community/posts/_lib/query/get-posts-options';
import { type GetPostsValues } from '@/app/[locale]/(dashboard)/community/posts/_lib/schema/get-posts-schema';
import { QueryParamKey } from '@/lib/constants';
import { getSorting } from '@/lib/helpers/table';
import { EmptyPaginationResponse } from '@/lib/services/default/constants';

interface PostsProps extends HTMLAttributes<HTMLDivElement> {
  hasFilter: boolean;
  validatedParams: GetPostsValues;
}

export function Posts({ validatedParams, hasFilter, ...props }: PostsProps): JSX.Element {
  const { data } = useSuspenseQuery(getPostsOptions(validatedParams));

  return (
    <Datatable
      data={data.status ? data.data : EmptyPaginationResponse}
      hasFilter={hasFilter}
      sorting={getSorting(validatedParams[QueryParamKey.SortBy])}
      {...props}
    />
  );
}
