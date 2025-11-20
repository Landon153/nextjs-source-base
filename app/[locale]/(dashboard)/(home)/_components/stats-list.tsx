import { startOfMonth } from 'date-fns/startOfMonth';
import { type HTMLAttributes, type JSX } from 'react';

import { StatsCard } from '@/app/[locale]/(dashboard)/(home)/_components/stats-card';
import { getGeneralStatistic } from '@/lib/services/default/features/user';
import { cn } from '@/lib/utils';

type StatsListProps = HTMLAttributes<HTMLDivElement>;

export async function StatsList({ className, ...props }: StatsListProps): Promise<JSX.Element | null> {
  const response = await getGeneralStatistic({
    timeToday: new Date().toISOString(),
    timeThisMonthFromDate: startOfMonth(new Date()).toISOString(),
    timeThisMonthToDate: new Date().toISOString(),
  });

  const stats = [
    { title: '금일 가입 회원 수 (명)', value: response.status ? response.data.totalUserToday : 0 },
    { title: '당월 가입 회원 수 (명)', value: response.status ? response.data.totalUserThisMonth : 0 },
    { title: '총 회원 수 (명)', value: response.status ? response.data.totalUserAll : 0 },
  ];

  return (
    <div className={cn('flex flex-wrap gap-5', className)} {...props}>
      {stats.map((stat) => (
        <StatsCard key={`${stat.title}${stat.value}`} className="grow" title={stat.title} value={stat.value} />
      ))}
    </div>
  );
}
