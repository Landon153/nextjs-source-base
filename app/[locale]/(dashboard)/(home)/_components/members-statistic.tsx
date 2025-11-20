'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { GraphCard } from '@/app/[locale]/(dashboard)/(home)/_components/graph-card';
import { useChartData } from '@/app/[locale]/(dashboard)/(home)/_lib/_hook/use-chart-data';
import { getMembersStatisticOptions } from '@/app/[locale]/(dashboard)/(home)/_lib/query/get-statistic-options';
import { type GetStatisticValues } from '@/app/[locale]/(dashboard)/(home)/_lib/schema/get-statistic-schema';
import { QueryParamKey, StatisticKeys } from '@/lib/constants';

interface MembersStatisticProps extends HTMLAttributes<HTMLDivElement> {
  searchParams: GetStatisticValues;
}

export function MembersStatistic({ searchParams, ...props }: MembersStatisticProps): JSX.Element {
  const { data } = useSuspenseQuery(getMembersStatisticOptions(searchParams));

  const chartData = useChartData(data.status ? data.data : [], searchParams[StatisticKeys.Period]);

  return (
    <GraphCard
      data={chartData}
      placeholder={{
        month: '월을 선택하세요',
        period: '기간을 선택하세요',
        year: '년을 선택하세요',
      }}
      queryParamKey={{
        month: QueryParamKey.MembersByMonth,
        period: QueryParamKey.MembersPeriod,
        year: QueryParamKey.MembersByYear,
      }}
      searchParams={searchParams}
      title="총 회원 수 (명)"
      {...props}
    />
  );
}
