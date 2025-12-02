import { type HTMLAttributes, type JSX, useCallback } from 'react';

import { useReportValue, useSetReportState } from '@/app/[locale]/(dashboard)/reports/[id]/_lib/hooks/use-report';
import { ContentDetailItem } from '@/components/shared/content-detail-item';
import { ToggleUserSuspension } from '@/components/shared/toggle-user-suspension';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/styles/button-variants';
import { QueryKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { formatDateTime } from '@/lib/helpers/date';
import { Link } from '@/lib/i18n/routing';
import { type ApiResponse } from '@/lib/services/default/fetcher';
import { type ProfileReport } from '@/lib/services/default/types/report';
import { type User } from '@/lib/services/default/types/user';
import { cn } from '@/lib/utils';

interface ReportProfileCardProps extends HTMLAttributes<HTMLDivElement> {
  report: ProfileReport;
}

export function ReportProfileCard({
  className,
  report: { profile: user },
  ...props
}: ReportProfileCardProps): JSX.Element {
  const queryClient = getQueryClient();
  const report = useReportValue();
  const setReport = useSetReportState();

  const handleUserSuspensionToggle = useCallback<(response: ApiResponse<User>) => void>(
    async (response) => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.UserReport] });

      if (!response.status) {
        return;
      }

      if (report === null || !('profile' in report)) {
        return;
      }

      setReport({
        ...report,
        profile: { ...report.profile, bannedAt: response.data.bannedAt },
      });
    },
    [queryClient, report, setReport],
  );

  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader className="min-h-15 justify-center py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <CardTitle className="text-sm font-medium">상세 정보</CardTitle>
          <div className="flex items-center gap-2">
            <ToggleUserSuspension user={user} onSendComplete={handleUserSuspensionToggle} />

            <Link className={buttonVariants({ size: 'xs' })} href={`/users/${user.id}`} target="_blank">
              자세히 보기
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 border-t border-slate-100 p-6 pt-5">
        <div className="py-10">
          <Avatar className="mx-auto size-50">
            <AvatarImage alt={user.nickname} src={user.avatar ?? undefined} />
            <AvatarFallback className="text-4xl font-bold">{user.nickname.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </div>
        <ul>
          <ContentDetailItem label="게시글 수" value={user.statistic?.totalPost.toLocaleString()} />
          <ContentDetailItem label="댓글/대댓글 수" value={user.statistic?.totalComment.toLocaleString()} />
          <ContentDetailItem label="가입 일시" value={formatDateTime(user.createdAt)} />
          <ContentDetailItem label="최근 접속 일시" value={formatDateTime(user.recentAccessAt)} />
        </ul>
      </CardContent>
    </Card>
  );
}
