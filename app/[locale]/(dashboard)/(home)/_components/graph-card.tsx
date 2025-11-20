'use client';

import { type HTMLAttributes, type JSX } from 'react';

import { periodOptions, PeriodValues } from '@/app/[locale]/(dashboard)/(home)/_lib/constants';
import { getLast12Months, getYearsFromFirstSubscriber } from '@/app/[locale]/(dashboard)/(home)/_lib/date';
import type { GetStatisticValues } from '@/app/[locale]/(dashboard)/(home)/_lib/schema/get-statistic-schema';
import { FilterSelect } from '@/app/[locale]/(dashboard)/_components/filter/filter-select';
import { Recharts } from '@/components/charts/recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatisticKeys } from '@/lib/constants';
import { useUrlParams } from '@/lib/hooks/use-url-params';
import { cn } from '@/lib/utils';

interface GraphCardProps extends HTMLAttributes<HTMLDivElement> {
  data: { time: string | number; value: number }[];
  placeholder: {
    month: string;
    period: string;
    year: string;
  };
  queryParamKey: {
    month: string;
    period: string;
    year: string;
  };
  searchParams: GetStatisticValues;
  title: string;
}

export function GraphCard({
  className,
  data = [],
  title,
  queryParamKey,
  placeholder,
  searchParams,
}: GraphCardProps): JSX.Element {
  const urlParams = useUrlParams();
  const months = getLast12Months();
  const years = getYearsFromFirstSubscriber(2024);

  return (
    <Card className={cn('min-w-0', className)}>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <CardTitle className="font-medium">{title}</CardTitle>

          <div className="flex flex-wrap gap-2">
            <FilterSelect
              classNames={{
                trigger: 'w-auto min-w-22 font-medium',
              }}
              defaultValue={periodOptions[0].value}
              options={periodOptions}
              placeholder={placeholder.period}
              value={searchParams[StatisticKeys.Period]}
              onValueChange={(value) => {
                urlParams.push({ [queryParamKey.period]: value });
              }}
            />

            {searchParams[StatisticKeys.Period] === PeriodValues.Month && (
              <FilterSelect
                classNames={{
                  trigger: 'w-auto min-w-24.5 uppercase font-medium',
                  item: 'uppercase',
                }}
                defaultValue={months[0].value}
                options={months}
                placeholder={placeholder.month}
                value={String(searchParams[StatisticKeys.Month])}
                onValueChange={(value) => {
                  urlParams.push({ [queryParamKey.month]: value });
                }}
              />
            )}

            {searchParams[StatisticKeys.Period] === PeriodValues.Year && (
              <FilterSelect
                classNames={{
                  trigger: 'w-auto min-w-24.5 font-medium',
                }}
                defaultValue={years[0].value}
                options={years}
                placeholder={placeholder.year}
                value={String(searchParams[StatisticKeys.Year])}
                onValueChange={(value) => {
                  urlParams.push({ [queryParamKey.year]: value });
                }}
              />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.length ? (
          <Recharts data={data} />
        ) : (
          <div className="grid min-h-87.5 place-items-center text-muted-foreground">
            <p>데이터가 없습니다.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
