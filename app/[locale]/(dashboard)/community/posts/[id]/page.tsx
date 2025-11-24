import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { CommentsTable } from '@/app/[locale]/(dashboard)/community/posts/[id]/_components/comments-table';
import { PostDetails } from '@/app/[locale]/(dashboard)/community/posts/[id]/_components/post-details';
import { getPostCommentsOptions } from '@/app/[locale]/(dashboard)/community/posts/[id]/_lib/query/get-post-comments-options';
import { getQueryClient } from '@/lib/get-query-client';
import { DefaultLimit, DefaultPage } from '@/lib/services/default/constants';
import { getPostDetails } from '@/lib/services/default/features/posts';
import { type SearchParams } from '@/lib/types/common';

interface PostDetailsPageProps {
  params: { id: string };
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: '게시글 상세',
};

export default async function CommunityPostDetailsPage({
  params,
  searchParams,
}: PostDetailsPageProps): Promise<JSX.Element> {
  const response = await getPostDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    getPostCommentsOptions(params.id, {
      page: DefaultPage,
      limit: DefaultLimit,
      sortBy: (searchParams.sortBy as string) || undefined,
    }),
  );

  const { data } = response;

  return (
    <Main
      breadcrumbs={[
        { href: '/community/posts', label: '커뮤니티 관리' },
        { href: '/community/posts', label: '게시글 관리' },
        { href: `/community/posts/${params.id}`, label: '게시글 상세' },
      ]}
      className="space-y-5"
    >
      <PostDetails post={data} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommentsTable
          postId={params.id}
          totalComments={data.statistic?.totalComment ?? 0}
          totalReplies={data.statistic?.totalReply ?? 0}
        />
      </HydrationBoundary>
    </Main>
  );
}
