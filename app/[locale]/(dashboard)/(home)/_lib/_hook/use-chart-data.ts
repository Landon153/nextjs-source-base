import { getDate } from 'date-fns/getDate';
import { useMemo } from 'react';

import { PeriodValues } from '@/app/[locale]/(dashboard)/(home)/_lib/constants';
import { type ChartStatistic } from '@/lib/services/default/types/user';

/**
 * Processes chart data based on the specified period.
 *
 * @param data - An array of chart statistics objects, each containing a time and total value.
 * @param period - The period value to determine how the data should be processed.
 * @returns An array of objects containing `time` and `value` properties for chart representation.
 */
export function useChartData(data: ChartStatistic[], period: PeriodValues): { time: string | number; value: number }[] {
  return useMemo(() => {
    if (period === PeriodValues.Year) {
      // sum up the total visitors for each month
      const monthMap = new Map<number, number>();

      data.forEach((item: { time: string; total: number }) => {
        const month: number = new Date(item.time).getMonth();

        monthMap.set(month, (monthMap.get(month) ?? 0) + item.total);
      });

      return Array.from(monthMap).map(([month, total]) => ({
        time: new Date(new Date().getFullYear(), month).toLocaleString('default', { month: 'short' }),
        value: total,
      }));
    }

    return data.map((item) => ({
      time: getDate(new Date(item.time)),
      value: item.total,
    }));
  }, [data, period]);
}
