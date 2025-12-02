'use client';

import { type HTMLAttributes, type JSX } from 'react';

import { ReportCommentCard } from '@/app/[locale]/(dashboard)/reports/[id]/_components/report-comment-card';
import { ReportPostCard } from '@/app/[locale]/(dashboard)/reports/[id]/_components/report-post-card';
import { ReportProfileCard } from '@/app/[locale]/(dashboard)/reports/[id]/_components/report-profile-card';
import { useReportValue } from '@/app/[locale]/(dashboard)/reports/[id]/_lib/hooks/use-report';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ReportType } from '@/lib/services/default/constants';
import { cn } from '@/lib/utils';

type UserReportCardProps = HTMLAttributes<HTMLDivElement>;

export function UserReportCard({ className, ...props }: UserReportCardProps): JSX.Element {
  const report = useReportValue();

  if (!report) {
    return (
      <Card>
        <CardHeader className="min-h-15 justify-center py-3">
          <Skeleton className="h-4 w-14" />
        </CardHeader>
        <CardContent className="space-y-4 border-t border-slate-100 p-6">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </CardContent>
      </Card>
    );
  }

  let ReportComponent: JSX.Element | null = null;

  switch (report.type) {
    case ReportType.CommentReply:
      ReportComponent = <ReportCommentCard report={report} />;
      break;

    case ReportType.Comment:
      ReportComponent = <ReportCommentCard report={report} />;
      break;

    case ReportType.Post:
      ReportComponent = <ReportPostCard report={report} />;
      break;

    case ReportType.Profile:
      ReportComponent = <ReportProfileCard report={report} />;
      break;
  }

  return (
    <div className={cn('', className)} {...props}>
      {ReportComponent}
    </div>
  );
}
