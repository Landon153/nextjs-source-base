import { type HTMLAttributes, type JSX, useCallback } from 'react';

import { useReportValue, useSetReportState } from '@/app/[locale]/(dashboard)/reports/[id]/_lib/hooks/use-report';
import { ContentDetailItem } from '@/components/shared/content-detail-item';
import { PostCarousel } from '@/components/shared/post-carousel';
import { TogglePostSuspension } from '@/components/shared/toggle-post-suspension';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/styles/button-variants';
import { QueryKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { formatDateTime } from '@/lib/helpers/date';
import { Link } from '@/lib/i18n/routing';
import type { ApiResponse } from '@/lib/services/default/fetcher';
import { type Post } from '@/lib/services/default/types/post';
import { type PostReport } from '@/lib/services/default/types/report';
import { cn } from '@/lib/utils';

interface ReportPostCardProps extends HTMLAttributes<HTMLDivElement> {
  report: PostReport;
}

export function ReportPostCard({ className, report: { post }, ...props }: ReportPostCardProps): JSX.Element {
  const queryClient = getQueryClient();
  const report = useReportValue();
  const setReport = useSetReportState();

  const handlePostSuspensionToggle = useCallback<(response: ApiResponse<Post>) => void>(
    async (response) => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.UserReport] });

      if (!response.status) {
        return;
      }

      if (report === null || !('post' in report)) {
        return;
      }

      setReport({ ...report, post: { ...report.post, isShow: response.data.isShow } });
    },
    [queryClient, report, setReport],
  );

  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader className="min-h-15 justify-center py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <CardTitle className="text-sm font-medium">상세 정보</CardTitle>
          <div className="flex items-center gap-2">
            <TogglePostSuspension post={post} onSendComplete={handlePostSuspensionToggle} />

            <Link className={buttonVariants({ size: 'xs' })} href={`/community/posts/${post.id}`} target="_blank">
              자세히 보기
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 border-t border-slate-100 p-6 pt-5">
        <PostCarousel classNames={{ item: 'basis-full aspect-square' }} data={post.files} />
        <ul>
          <ContentDetailItem label="비공개 처리일시" value={formatDateTime(post.createdAt)} />
          <ContentDetailItem label="내용" value={post.content} />
        </ul>
      </CardContent>
    </Card>
  );
}
