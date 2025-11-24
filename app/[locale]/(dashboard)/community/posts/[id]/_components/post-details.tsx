'use client';

import { type HTMLAttributes, type JSX } from 'react';

import { ContentDetailItem } from '@/components/shared/content-detail-item';
import { PostCarousel } from '@/components/shared/post-carousel';
import { TogglePostSuspension } from '@/components/shared/toggle-post-suspension';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime } from '@/lib/helpers/date';
import { type Post } from '@/lib/services/default/types/post';
import { cn } from '@/lib/utils';

type PostDetailsProps = HTMLAttributes<HTMLDivElement> & {
  post: Post;
};

export function PostDetails({ className, post, ...props }: PostDetailsProps): JSX.Element {
  return (
    <Card className={cn('min-w-0', className)} {...props}>
      <CardHeader className="min-h-15 justify-center py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <CardTitle className="text-sm font-medium">게시글 정보</CardTitle>

          <TogglePostSuspension post={post} />
        </div>
      </CardHeader>

      <CardContent className="border-t border-slate-100 p-6 pt-5">
        <div
          className={cn(
            'grid min-h-0 gap-x-6',
            post.files && post.files.length > 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-[24rem_1fr]',
          )}
        >
          <PostCarousel
            classNames={{
              wrapper: 'h-full',
              content: 'h-full',
              item: cn('aspect-square', post.files && post.files.length > 1 ? 'basis-2/3' : 'basis-full'),
            }}
            data={post.files}
          />

          <ul>
            <ContentDetailItem label="작성자" value={post.writer.nickname} />
            <ContentDetailItem label="등록일" value={formatDateTime(post.createdAt)} />
            <ContentDetailItem
              label="조회 수"
              value={post.statistic?.totalView ? post.statistic.totalView.toLocaleString() : 0}
            />
            <ContentDetailItem
              label="좋아요 수"
              value={post.statistic?.totalLike ? post.statistic.totalLike.toLocaleString() : 0}
            />
            <ContentDetailItem label="공개 상태" value={post.isShow ? '공개' : '비공개'} />
            <ContentDetailItem label="비공개 처리일시" value={formatDateTime(post.hideAt)} />
            <ContentDetailItem label="내용" value={post.content} />
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
