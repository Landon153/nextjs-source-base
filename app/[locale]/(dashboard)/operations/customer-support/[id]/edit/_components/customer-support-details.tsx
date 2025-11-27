'use client';

import { type HTMLAttributes, type JSX } from 'react';

import { ContentDetailItem } from '@/components/shared/content-detail-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime } from '@/lib/helpers/date';
import { type CustomerSupport } from '@/lib/services/default/types/customer-support';

interface CustomerSupportDetailsProps extends HTMLAttributes<HTMLDivElement> {
  data: CustomerSupport;
}

export function CustomerSupportDetails({
  data: { userEmail, createdAt, questionContent },
}: CustomerSupportDetailsProps): JSX.Element {
  return (
    <Card>
      <CardHeader className="min-h-15 justify-center py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">문의 정보</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="border-t border-slate-100 p-6 pt-0">
        <ul className="grid gap-x-6 lg:grid-cols-2">
          <ContentDetailItem label="문의자 이메일" value={userEmail} />
          <ContentDetailItem label="문의일시" value={formatDateTime(createdAt)} />
          <ContentDetailItem label="내용" value={questionContent} />
        </ul>
      </CardContent>
    </Card>
  );
}
