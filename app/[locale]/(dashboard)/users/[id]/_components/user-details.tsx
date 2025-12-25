'use client';

import { type HTMLAttributes, type JSX } from 'react';

import { ContentDetailItem } from '@/components/shared/content-detail-item';
import { ToggleUserSuspension } from '@/components/shared/toggle-user-suspension';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime } from '@/lib/helpers/date';
import { formatPhone } from '@/lib/helpers/string';
import { UserTypeReverse } from '@/lib/services/default/constants';
import { type User } from '@/lib/services/default/types/user';

type UserDetailsProps = HTMLAttributes<HTMLDivElement> & {
  user: User;
};

export function UserDetails({ user, ...props }: UserDetailsProps): JSX.Element {
  return (
    <Card {...props}>
      <CardHeader className="min-h-15 justify-center py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <CardTitle className="text-lg font-bold text-slate-700">{user.nickname}</CardTitle>
          <ToggleUserSuspension user={user} />
        </div>
      </CardHeader>
      <CardContent className="border-t border-slate-100 p-6 pt-0">
        <ul className="grid gap-x-6 lg:grid-cols-2">
          <ContentDetailItem label="이메일" value={user.email} />
          <ContentDetailItem label="이용 중지 상태" value={user.bannedAt ? 'Y' : 'N'} />
          <ContentDetailItem label="가입방법" value={UserTypeReverse[user.userType]} />
          <ContentDetailItem label="이용 중지 일시" value={formatDateTime(user.bannedAt)} />
          <ContentDetailItem label="연락처" value={formatPhone(user.countryCode, user.phoneNumber)} />
          <ContentDetailItem label="이용 중지 횟수" value={user.statistic?.totalBanned ?? 0} />
          <ContentDetailItem label="가입 일시" value={formatDateTime(user.createdAt)} />
          <ContentDetailItem label="마케팅 수신동의" value={user.isMarketingNoti ? 'Y' : 'N'} />
          <ContentDetailItem label="최근 접속일시" value={formatDateTime(user.recentAccessAt)} />
        </ul>
      </CardContent>
    </Card>
  );
}
