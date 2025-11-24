'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { type HTMLAttributes, type JSX, useMemo } from 'react';

import { Datatable } from '@/app/[locale]/(dashboard)/community/posts/[id]/_components/datatable';
import { getPostCommentsOptions } from '@/app/[locale]/(dashboard)/community/posts/[id]/_lib/query/get-post-comments-options';
import { InfiniteScrollLoader } from '@/components/shared/infinite-scroll-loader';
import { CardFooter } from '@/components/ui/card';
import { DefaultLimit, DefaultPage, EmptyPaginationResponse } from '@/lib/services/default/constants';
import { cn } from '@/lib/utils';

interface CommentsTableProps extends HTMLAttributes<HTMLDivElement> {
  postId: string | number;
  totalComments: number;
  totalReplies: number;
}

export function CommentsTable({
  className,
  postId,
  totalComments,
  totalReplies,
  ...props
}: CommentsTableProps): JSX.Element {
  const searchParams = useSearchParams();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    getPostCommentsOptions(postId, {
      page: DefaultPage,
      limit: DefaultLimit,
      sortBy: searchParams.get('sortBy') || undefined,
    }),
  );

  const commentData = useMemo(() => {
    const items = data.pages.flatMap((page) => (page.status ? page.data.items : []));

    const lastPage = data.pages[data.pages.length - 1];
    const meta = lastPage.status ? lastPage.data.meta : EmptyPaginationResponse.meta;

    return { items, meta };
  }, [data.pages]);

  return (
    <Datatable
      className={cn('', className)}
      data={commentData}
      totalComments={totalComments}
      totalReplies={totalReplies}
      {...props}
    >
      <CardFooter className={cn('justify-center', hasNextPage ? 'py-5.5' : 'py-0')}>
        <InfiniteScrollLoader fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetching={isFetchingNextPage} />
      </CardFooter>
    </Datatable>
  );
}
