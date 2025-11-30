'use client';

import { endOfDay } from 'date-fns/endOfDay';
import { type HTMLAttributes, type JSX, useMemo } from 'react';

import { FilterDateRangePicker } from '@/app/[locale]/(dashboard)/_components/filter/filter-date-range-picker';
import { FilterSearch } from '@/app/[locale]/(dashboard)/_components/filter/filter-search';
import { FilterSelect } from '@/app/[locale]/(dashboard)/_components/filter/filter-select';
import { ResetFiltersButton } from '@/app/[locale]/(dashboard)/_components/reset-filters-button';
import { getOneYearAgo } from '@/app/[locale]/(dashboard)/_lib/date';
import { displayStatusOptions } from '@/app/[locale]/(dashboard)/operations/notices/_lib/constants';
import { type GetNoticesValues } from '@/app/[locale]/(dashboard)/operations/notices/_lib/schema/get-notices-schema';
import { QueryParamKey } from '@/lib/constants';
import { useUrlParams } from '@/lib/hooks/use-url-params';
import { cn } from '@/lib/utils';

const resetStateParams: Partial<Record<QueryParamKey, undefined>> = {
  [QueryParamKey.From]: undefined,
  [QueryParamKey.To]: undefined,
  [QueryParamKey.IsShow]: undefined,
  [QueryParamKey.Search]: undefined,
};
const resetStateKeys = Object.keys(resetStateParams);

/* -----------------------------------------------------------------------------
 * Component: Filters
 * -------------------------------------------------------------------------- */

interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  validatedParams: GetNoticesValues;
}

export function Filters({ className, validatedParams, ...props }: FiltersProps): JSX.Element {
  const oneYearAgo = useMemo(() => getOneYearAgo(), []);
  const urlParams = useUrlParams();

  const handleFilter = (filter: Record<string, string | undefined>): void => {
    urlParams.push({ ...filter, [QueryParamKey.Page]: undefined });
  };

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div className="flex flex-wrap gap-4">
        <FilterDateRangePicker
          disabled={(date) => date < oneYearAgo}
          placeholder="등록 기간을 선택해주세요"
          value={{ from: validatedParams[QueryParamKey.From], to: validatedParams[QueryParamKey.To] }}
          onValueChange={(value) => {
            handleFilter({
              [QueryParamKey.From]: value?.from?.toISOString(),
              [QueryParamKey.To]: value?.to && endOfDay(value.to).toISOString(),
            });
          }}
        />

        <FilterSelect
          options={displayStatusOptions}
          placeholder="공개 상태"
          value={validatedParams[QueryParamKey.IsShow]}
          onValueChange={(value) => {
            handleFilter({ [QueryParamKey.IsShow]: value });
          }}
        />

        <FilterSearch
          placeholder="제목을 입력해주세요."
          value={validatedParams[QueryParamKey.Search]}
          onValueChange={(value) => {
            handleFilter({ [QueryParamKey.Search]: value });
          }}
        />

        <ResetFiltersButton
          resetKeys={resetStateKeys}
          onClick={() => {
            urlParams.push({ ...resetStateParams, [QueryParamKey.Page]: undefined });
          }}
        />
      </div>
    </div>
  );
}
