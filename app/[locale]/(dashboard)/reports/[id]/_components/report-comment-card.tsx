import { type HTMLAttributes, type JSX, useCallback } from 'react';

import { ToggleCommentPrivateAction } from '@/app/[locale]/(dashboard)/reports/[id]/_components/toggle-comment-private-action';
import { useReportValue, useSetReportState } from '@/app/[locale]/(dashboard)/reports/[id]/_lib/hooks/use-report';
import { ContentDetailItem } from '@/components/shared/content-detail-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/styles/button-variants';
import { QueryKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { formatDateTime } from '@/lib/helpers/date';
import { Link } from '@/lib/i18n/routing';
import { type ApiSuccessResponse } from '@/lib/services/default/fetcher';
import type { Comment } from '@/lib/services/default/types/post';
import { type CommentReplyReport, type CommentReport } from '@/lib/services/default/types/report';
import { cn } from '@/lib/utils';

interface ReportCommentCardProps extends HTMLAttributes<HTMLDivElement> {
  report: CommentReport | CommentReplyReport;
}

export function ReportCommentCard({ className, report: { comment }, ...props }: ReportCommentCardProps): JSX.Element {
  const queryClient = getQueryClient();
  const report = useReportValue();
  const setReport = useSetReportState();

  const handleCommentVisibleToggle = useCallback<(response: ApiSuccessResponse<Comment>) => void>(
    async (response) => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.UserReport] });

      if (report === null || !('comment' in report)) {
        return;
      }

      setReport({ ...report, comment: { ...report.comment, isShow: response.data.isShow } });
    },
    [queryClient, report, setReport],
  );

  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader className="min-h-15 justify-center py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <CardTitle className="text-sm font-medium">상세 정보</CardTitle>
          <div className="flex items-center gap-2">
            <ToggleCommentPrivateAction comment={comment} onToggleComplete={handleCommentVisibleToggle} />

            <Link
              className={buttonVariants({ size: 'xs' })}
              href={`/community/posts/${comment.postId}`}
              target="_blank"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="border-t border-slate-100 p-6 pt-0">
        <ul>
          <ContentDetailItem label="비공개 처리일시" value={formatDateTime(comment.createdAt)} />
          <ContentDetailItem label="내용" value={comment.content} />
        </ul>
      </CardContent>
    </Card>
  );
}
